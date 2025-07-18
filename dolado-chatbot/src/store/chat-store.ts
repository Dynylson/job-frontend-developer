import { Message } from '@/types';
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { conversationSteps } from '@/data/conversation-steps';
import { persist } from 'zustand/middleware';
import axios from 'axios';

export interface ChatStore {
  messages: Message[];
  setMessages: (message: Message) => void;
  currentStepIndex: number;
  isInFollowUp: boolean;
  isBotTyping: boolean;
  visibleOptions: Record<string, boolean>;
  chatMode: 'SCRIPTED' | 'AI';
  setChatMode: (value: 'SCRIPTED' | 'AI') => void;
  hideOptionsFor: (id: string) => void;
  startConversation: () => void;
  resetConversation: () => void;
  botReply: () => void;
}

const initialState = {
  messages: [],
  currentStepIndex: 0,
  isInFollowUp: false,
  isBotTyping: false,
  visibleOptions: {},
  chatMode: 'SCRIPTED' as 'SCRIPTED' | 'AI',
};

export const useChatStore = create(
  persist<ChatStore>(
    (set, get) => ({
      ...initialState,
      setMessages: (message: Message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),
      setChatMode: (value: 'SCRIPTED' | 'AI') => set({ chatMode: value }),
      hideOptionsFor: (id: string) =>
        set((state) => ({
          visibleOptions: { ...state.visibleOptions, [id]: false },
        })),
      startConversation: () => {
        set({ isBotTyping: true });

        const currentStep = conversationSteps[0];

        setTimeout(() => {
          set({
            messages: [
              {
                id: uuidv4(),
                text: currentStep.message,
                sender: 'bot',
                options: currentStep.options || [],
              },
            ],
            isBotTyping: false,
            currentStepIndex: 1,
          });
        }, 2000);
      },
      resetConversation: () => {
        set(initialState);

        get().startConversation();
      },
      botReply: async () => {
        const { currentStepIndex, messages, isInFollowUp, chatMode } = get();

        set({ isBotTyping: true });

        if (chatMode === 'AI') {
          const apiMessages = messages.map((message) => ({
            role: message.sender === 'bot' ? 'assistant' : 'user',
            content: message.text,
          }));

          try {
            const { data } = await axios.post('/api/chat', {
              messages: apiMessages,
            });

            set((state) => ({
              messages: [
                ...state.messages,
                { id: uuidv4(), sender: 'bot', text: data.reply },
              ],
              isBotTyping: false,
            }));
          } catch (error) {
            console.error(error);

            set((state) => ({
              messages: [
                ...state.messages,
                {
                  id: uuidv4(),
                  sender: 'bot',
                  text: 'Ocorreu um erro. Tente novamente!',
                },
              ],
              isBotTyping: false,
            }));
          }

          return;
        }

        setTimeout(() => {
          const currentStep = conversationSteps[currentStepIndex];

          if (!currentStep) return;

          if (isInFollowUp && currentStep?.followUp) {
            set({
              isInFollowUp: false,
              messages: [
                ...messages,
                {
                  id: uuidv4(),
                  text: currentStep.followUp.message,
                  sender: 'bot',
                  options: currentStep.followUp.options || [],
                },
              ],
              currentStepIndex: currentStepIndex + 1,
              isBotTyping: false,
            });

            return;
          }

          if (!isInFollowUp && currentStep?.followUp) {
            set({
              isInFollowUp: true,
              messages: [
                ...messages,
                {
                  id: uuidv4(),
                  text: currentStep.message,
                  sender: 'bot',
                  options: currentStep.options || [],
                },
              ],
              isBotTyping: false,
            });

            return;
          }

          set({
            messages: [
              ...messages,
              {
                id: uuidv4(),
                text: currentStep.message,
                sender: 'bot',
                options: currentStep.options || [],
              },
            ],
            isBotTyping: false,
            currentStepIndex: currentStepIndex + 1,
          });
        }, 1500);
      },
    }),
    {
      name: 'chat-storage',
    },
  ),
);
