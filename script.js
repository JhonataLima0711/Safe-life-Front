const body = document.body;
const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");

let toastTimer;

// ======================================================
// SISTEMA DE NOTIFICAÇÃO
// ======================================================

function showToast(message) {
    toastText.textContent = message;

    toast.classList.add("visible");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("visible");
    }, 2600);
}


// ======================================================
// MODO ESCURO
// ======================================================

document.getElementById("themeToggle").addEventListener("click", () => {

    body.classList.toggle("dark");

    const isDark = body.classList.contains("dark");

    const themeButton = document.getElementById("themeToggle");

    themeButton.textContent = isDark ? "☾" : "☼";

    localStorage.setItem(
        "healthtrack-theme",
        isDark ? "dark" : "light"
    );

    showToast(
        isDark
            ? "Modo escuro ativado."
            : "Modo claro ativado."
    );
});


// Recupera o tema salvo
if (localStorage.getItem("healthtrack-theme") === "dark") {

    body.classList.add("dark");

    document.getElementById("themeToggle").textContent = "☾";
}


// ======================================================
// MENU MOBILE
// ======================================================

document
    .getElementById("mobileMenu")
    .addEventListener("click", () => {

        const sidebar = document.getElementById("sidebar");

        sidebar.classList.toggle("open");
    });


// ======================================================
// NAVEGAÇÃO
// ======================================================

// ======================================================
// NAVEGAÇÃO E TROCA DE TELAS
// ======================================================
const sectionNames = {
    overview: "Hoje",
    activity: "Atividade",
    sleep: "Sono",
    nutrition: "Nutrição",
    history: "Histórico",
    goals: "Metas"
};

document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", () => {
        // 1. Remove o estado ativo de todos os botões do menu
        document.querySelectorAll(".nav-item").forEach(element => {
            element.classList.remove("active");
        });

        // 2. Ativa o botão clicado
        item.classList.add("active");

        // 3. Descobre qual seção foi selecionada
        const section = item.dataset.section;

        // 4. Atualiza o título do topo
        document.getElementById("sectionTitle").textContent = sectionNames[section];

        // 5. Oculta todas as views (telas)
        document.querySelectorAll(".dashboard-view").forEach(view => {
            view.classList.remove("active");
        });

        // 6. Mostra a view correspondente
        const activeView = document.getElementById(`view-${section}`);
        if (activeView) {
            activeView.classList.add("active");
        }

        // 7. Fecha o menu no celular (se estiver aberto)
        document.getElementById("sidebar").classList.remove("open");
    });
});
// ======================================================
// SISTEMA DE HIDRATAÇÃO
// ======================================================

let water = 1.8;

const waterGoal = 2.5;


document
    .getElementById("addWater")
    .addEventListener("click", () => {

        // Adiciona 250 ml
        water += 0.25;


        // Nunca ultrapassa a meta
        if (water > waterGoal) {

            water = waterGoal;

        }


        // Atualiza o número mostrado
        document.getElementById("waterValue").textContent =
            water.toFixed(2).replace(".", ",");


        // Calcula a porcentagem
        const percentage =
            (water / waterGoal) * 100;


        // Atualiza a barra
        document.getElementById("waterBar").style.width =
            `${percentage}%`;


        // Verifica se a meta foi atingida
        if (water >= waterGoal) {

            document.getElementById("addWater").textContent =
                "Meta atingida ✓";


            showToast(
                "Meta de hidratação atingida. Excelente!"
            );

        } else {

            const remaining =
                Math.round(
                    (waterGoal - water) * 1000
                );


            showToast(
                `+250 ml registrados. Faltam ${remaining} ml.`
            );

        }

    });


// ======================================================
// SISTEMA DE HÁBITOS
// ======================================================

const habits = document.querySelectorAll(".habit");


habits.forEach(habit => {

    const checkbox =
        habit.querySelector("input");


    checkbox.addEventListener("change", () => {

        // Adiciona/remove a classe de concluído
        habit.classList.toggle(
            "done",
            checkbox.checked
        );


        // Atualiza contador
        updateHabitCount();


        // Mostra mensagem
        if (checkbox.checked) {

            showToast(
                "Hábito concluído!"
            );

        } else {

            showToast(
                "Hábito reaberto."
            );

        }

    });

});


// Atualiza o contador de hábitos
function updateHabitCount() {

    const completed =
        [...habits].filter(habit => {

            return habit
                .querySelector("input")
                .checked;

        }).length;


    const completion =
        document.querySelector(".completion");


    completion.textContent =
        `${completed}/${habits.length}`;
}


// ======================================================
// ADICIONAR HÁBITO
// ======================================================

document
    .getElementById("addHabit")
    .addEventListener("click", () => {

        showToast(
            "Na versão conectada ao backend, aqui você criará novos hábitos."
        );

    });


// ======================================================
// PERSONALIZAÇÃO
// ======================================================

document
    .getElementById("customizeBtn")
    .addEventListener("click", () => {

        showToast(
            "Área de personalização aberta — protótipo de interface."
        );

    });


// ======================================================
// DETALHES DO HEALTH SCORE
// ======================================================

document
    .getElementById("scoreDetails")
    .addEventListener("click", () => {

        showToast(
            "Score calculado com base nos indicadores do dia."
        );

    });


// ======================================================
// SELETOR DE DATA
// ======================================================

document
    .getElementById("dateSelector")
    .addEventListener("click", () => {

        showToast(
            "Seletor de data — pronto para conectar a um calendário."
        );

    });


// ======================================================
// GRÁFICO DE ATIVIDADE
// ======================================================

const chartSets = {

    7: [
        55,
        72,
        65,
        88,
        69,
        97,
        84
    ],

    14: [
        47,
        58,
        64,
        55,
        74,
        82,
        68,
        91,
        76,
        85,
        72,
        93,
        79,
        84
    ]

};


document
    .getElementById("rangeSelect")
    .addEventListener("change", event => {

        const selectedRange =
            event.target.value;


        const values =
            chartSets[selectedRange];


        const bars =
            document.querySelector(".bars");


        // Limpa o gráfico atual
        bars.innerHTML = "";


        // Cria novamente as barras
        values.forEach((value, index) => {

            const column =
                document.createElement("div");


            column.className =
                "bar-col";


            // Última barra recebe destaque
            if (index === values.length - 1) {

                column.classList.add("current");

            }


            const bar =
                document.createElement("div");


            bar.className =
                "bar";


            bar.style.height =
                `${value}%`;


            const label =
                document.createElement("small");


            if (selectedRange === "14") {

                label.textContent =
                    `${index + 1}`;

            } else {

                const labels = [
                    "Seg",
                    "Ter",
                    "Qua",
                    "Qui",
                    "Sex",
                    "Sáb",
                    "Hoje"
                ];


                label.textContent =
                    labels[index];

            }


            column.appendChild(bar);

            column.appendChild(label);

            bars.appendChild(column);

        });


        // Mensagem
        if (selectedRange === "7") {

            showToast(
                "Exibindo os últimos 7 dias."
            );

        } else {

            showToast(
                "Exibindo os últimos 14 dias."
            );

        }

    });


// ======================================================
// ATALHO DE TECLADO
// ======================================================

// Pressionar "D" alterna o tema
document.addEventListener("keydown", event => {

    const activeElement =
        document.activeElement;


    // Não executa enquanto o usuário estiver
    // digitando em um campo
    const typing =
        [
            "INPUT",
            "SELECT",
            "TEXTAREA"
        ].includes(activeElement.tagName);


    if (
        event.key.toLowerCase() === "d" &&
        !typing
    ) {

        document
            .getElementById("themeToggle")
            .click();

    }

});