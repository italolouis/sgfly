export const MENU_ITEMS= [{
    "text": "Dashboard",
    "icon": "dashboard",
    "routerLink": "/pages/dashboard",
    "showHeader" : "false"
  },
  {
    "text": "Financeiro",
    "icon": "local_atm",
    "children": [
        {
            "text": "Plano de Contas",
            "icon": "event_note",
            "routerLink": "/pages/planoContas"
        },
        {
            "text": "Despesas",
            "icon": "money_off",
            "routerLink": "/pages/despesa"
        },
        {
            "text": "Receitas",
            "icon": "attach_money",
            "routerLink": "/pages/receita"
        },
    ]
  },
];
