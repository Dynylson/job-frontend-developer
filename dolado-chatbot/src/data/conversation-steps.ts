import { ConversationStep } from "@/types";

export const conversationSteps: ConversationStep[] = [
    {
        "message": "Oi! Eu sou Sofia, consultora digital da Dolado. 😊 Sei que falar sobre vendas online pode parecer complicado, mas prometo que vamos tornar isso bem simples. Em 5 minutos, vou te mostrar exatamente como sua empresa pode crescer nos marketplaces. Pode ser?",
        "type": "welcome",
        "options": ["Claro, vamos lá!", "Primeiro quero entender melhor"],
    },
    {
        "message": "Perfeito! Deixa eu te conhecer melhor. Conta aí, que tipo de operação vocês têm? Quero entender a complexidade do negócio para dar as orientações mais assertivas.",
        "type": "qualification", 
        "options": ["Somos indústria/fabricantes", "Distribuidores atacadistas", "Operação mista (fabricamos e distribuímos)", "Grupo empresarial"],
        "followUp": {
            "message": "Que legal! E em termos de estrutura, vocês são uma operação de que porte?",
            "options": ["Média empresa (R$ 10-50mi/ano)", "Grande empresa (R$ 50-200mi/ano)", "Corporação (R$ 200mi+/ano)", "Grupo/Holding"],
        },
    },
    {
        "message": "Entendi perfeitamente o perfil! Agora, uma pergunta estratégica: como vocês enxergam os marketplaces? Sei que muitas indústrias têm receios sobre canibalizarização dos canais tradicionais.",
        "type": "marketplace",
        "options": ["Vemos como oportunidade adicional", "Temos receio de conflito com distribuidores", "Ainda estamos avaliando", "Concorrentes já estão lá, precisamos reagir"],
        "followUp": {
            "message": "Faz sentido! E se fossem testar, qual canal seria mais estratégico para o porte de vocês?",
            "options": ["Mercado Livre (maior alcance)", "Amazon (perfil mais premium)", "Shopee (crescimento rápido)", "B2B marketplaces", "Marketplace próprio"],
        },
    },
    {
        "message": "Perfeito! Agora vamos falar do portfólio. Com o volume que vocês devem ter, imagino que seja um catálogo robusto. Quantas SKUs vocês gerenciam?",
        "type": "products",
        "options": ["Catálogo focado (até 500 SKUs)", "Portfólio amplo (500-2000 SKUs)", "Mega catálogo (2000+ SKUs)", "Multiple categorias/divisões"],
        "followUp": {
            "message": "E me conta, qual segmento representa o core do negócio de vocês?",
            "options": ["Bens de consumo duráveis", "Componentes/Insumos industriais", "Produtos de marca própria", "Linha completa multi-categoria", "B2B especializado"],
        }
    },
    {
        "message": "Seus produtos têm potencial gigantesco online! Agora, para entender melhor a maturidade operacional: como vocês gerenciam a operação hoje? ERP, WMS, integração?",
        "type": "diagnosis",
        "options": ["ERP robusto (SAP, Oracle, etc)", "Sistema próprio bem estruturado", "Mix de sistemas integrados", "Operação ainda manual em partes"],
        "followUp": {
            "message": "E em termos de marketing/branding digital, como vocês se posicionam no mercado?",
            "options": ["Marca consolidada offline, zero digital", "Presença básica (site institucional)", "Marketing B2B estruturado", "Estratégia digital em desenvolvimento", "Focamos só no relacionamento direto"],
        }
    },
    {
        "message": "Roberto, conversando com você fica claro uma coisa: vocês estão numa posição PRIVILEGIADA. Têm produto consolidado, operação estruturada, marca respeitada - só falta usar isso no digital. Empresas do porte de vocês que entraram nos marketplaces cresceram 40-60% sem canibalizarizar os canais tradicionais.",
        "type": "result",
    }
];