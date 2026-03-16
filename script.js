// Dados das aulas
const aulas = [
    { id: "2XXJtQ2HQOA", title: "01. Consumidor e Psicologia", desc: "A base de tudo: como a mente humana decide comprar." },
    { id: "kwLaP6wDq2k", title: "02. Tráfego Pago 2025", desc: "O guia prático para escalar seus resultados com anúncios." },
    { id: "vFGysNRHMu0", title: "03. ChatGPT e Produtividade", desc: "Como usar IA para ganhar 10 horas na sua semana." },
    { id: "LGUGYL6wehc", title: "04. Estratégias de Venda", desc: "Técnicas de fechamento e funis de alta conversão." }
];

// Gerador de Banco de Dados Simulado (100 Alunos)
const db_alunos = Array.from({ length: 100 }, (_, i) => ({
    email: `aluno${i + 1}@mastery.com`,
    pass: "123456"
}));

// Variáveis de Estado
let progressoAtual = 25;

// Seletores DOM
const loginForm = document.getElementById('auth-form');
const logoutBtn = document.getElementById('logout-btn');
const completeBtn = document.getElementById('complete-btn');
const playlistContainer = document.getElementById('playlist');

// Lógica de Autenticação
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailIn = document.getElementById('email').value;
    const passIn = document.getElementById('password').value;

    const alunoValido = db_alunos.find(u => u.email === emailIn && u.pass === passIn);

    if (alunoValido) {
        document.getElementById('login-container').classList.add('hidden');
        document.getElementById('app-container').classList.remove('hidden');
        
        // Atualiza Informações do Aluno
        const nomeExibicao = emailIn.split('@')[0].toUpperCase();
        document.getElementById('user-display').innerText = nomeExibicao;
        document.getElementById('user-avatar').innerText = nomeExibicao.substring(0, 2);
        
        renderizarPlaylist();
    } else {
        alert("E-mail ou senha incorretos! Tente aluno1@mastery.com");
    }
});

// Logout
logoutBtn.addEventListener('click', () => {
    window.location.reload();
});

// Renderização da Playlist
function renderizarPlaylist() {
    playlistContainer.innerHTML = aulas.map((aula, i) => `
        <div onclick="carregarVideo('${aula.id}','${aula.title}','${aula.desc}', ${i})" 
             class="lesson p-5 rounded-3xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-all flex items-center gap-4 ${i === 0 ? 'active-lesson' : ''}">
            <div class="size-8 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-[10px] font-black">${i + 1}</div>
            <span class="text-xs font-bold truncate">${aula.title}</span>
        </div>
    `).join('');
}

// Lógica do Player
window.carregarVideo = function(id, titulo, descricao, index) {
    document.getElementById('mainPlayer').src = `https://www.youtube.com/embed/${id}?autoplay=1`;
    document.getElementById('vTitle').innerText = titulo;
    document.getElementById('vDesc').innerText = descricao;
    
    // Atualiza visual da playlist
    document.querySelectorAll('.lesson').forEach((item, i) => {
        item.classList.toggle('active-lesson', i === index);
    });
};

// Progresso
completeBtn.addEventListener('click', () => {
    if (progressoAtual < 100) {
        progressoAtual += 25;
        document.getElementById('bar').style.width = progressoAtual + '%';
        alert(`Excelente! Seu progresso agora é de ${progressoAtual}%`);
    } else {
        alert("Você já concluiu todo o treinamento!");
    }
});


