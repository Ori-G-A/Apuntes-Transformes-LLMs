// --- LÓGICA DE INTERFAZ ---

// Función global para los acordeones
function toggleAccordion(element) {
    const parent = element.parentElement;
    const container = parent.parentElement;
    const isActive = parent.classList.contains('active');

    // Cerrar solo los acordeones del mismo nivel (hermanos directos)
    const siblings = container.querySelectorAll(':scope > .accordion-item');
    siblings.forEach(item => {
        item.classList.remove('active');
    });

    if (!isActive) {
        parent.classList.add('active');
    }
}

// Función para renderizar el contenido
function renderChapter(data) {
    const container = document.getElementById('course-content');
    if (!container) return;

    container.innerHTML = ''; // Limpiar contenido previo

    let html = `
        <h2 class="text-slate-500 font-mono text-sm uppercase tracking-widest mb-6 ml-2">
            ${data.title || 'Capítulo'}
        </h2>
        <div class="space-y-4">
    `;

    // Recorrer Secciones (1.1, 1.2...)
    const sections = data.parts || data.unidades || [];
    
    sections.forEach(part => {
        html += `
            <div class="accordion-item border border-slate-800 rounded-3xl overflow-hidden bg-slate-900/20">
                <button class="w-full px-8 py-6 flex justify-between items-center group" onclick="toggleAccordion(this)">
                    <div class="text-left">
                        <span class="text-cyan-500 font-mono text-xs uppercase tracking-widest">Sección ${part.id}</span>
                        <h3 class="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">${part.title}</h3>
                    </div>
                    <span class="text-2xl text-slate-700 group-hover:text-cyan-500 transition-transform duration-300 icon-arrow">↓</span>
                </button>
                
                <div class="accordion-content">
                    <div class="accordion-inner p-6 space-y-4">
                        
                        ${part.subsections ? part.subsections.map(sub => `
                            <div class="accordion-item border border-slate-700/50 rounded-2xl overflow-hidden bg-slate-800/30">
                                <button class="w-full px-6 py-4 flex justify-between items-center group/sub" onclick="toggleAccordion(this)">
                                    <div class="text-left">
                                        <span class="text-slate-500 font-mono text-[10px] uppercase">${sub.subid}</span>
                                        <h4 class="text-md font-semibold text-slate-200 group-hover/sub:text-cyan-300">${sub.subtitle}</h4>
                                    </div>
                                    <span class="text-lg text-slate-600 group-hover/sub:text-cyan-500 icon-arrow">↓</span>
                                </button>
                                
                                <div class="accordion-content">
                                    <div class="p-6 pt-0 space-y-3">
                                        ${sub.description ? `<p class="text-xs text-slate-500 italic mb-4 border-l border-slate-700 pl-3">${sub.description}</p>` : ''}
                                        
                                        <div class="grid gap-3">
                                            ${sub.concepts.map(c => `
                                                <div class="concept-card p-4 bg-slate-800/60 rounded-xl border border-slate-700/50">
                                                    <div class="flex gap-3">
                                                        <span class="bg-cyan-500/10 text-cyan-400 text-[10px] font-bold px-2 py-1 rounded border border-cyan-500/20 h-fit uppercase">${c.acronym}</span>
                                                        <div>
                                                            <h5 class="text-white text-sm font-bold">${c.name}</h5>
                                                            <p class="text-xs text-slate-400 mt-1 leading-relaxed">${c.definition}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('') : ''}

                    </div>
                </div>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
}

// Función para cambiar de capítulo (Pestañas)
function switchChapter(chapterId, element) {
    // Actualizar botones
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active-tab'));
    element.classList.add('active-tab');

    // Cargar datos según el ID
    if (chapterId === 'cap1' && typeof capitulo1 !== 'undefined') {
        renderChapter(capitulo1);
    } else if (chapterId === 'cap2' && typeof capitulo2 !== 'undefined') {
        renderChapter(capitulo2);
    } else if (chapterId === 'cap3' && typeof capitulo3 !== 'undefined') {
        renderChapter(capitulo3);
    } else if (chapterId === 'cap4' && typeof capitulo4 !== 'undefined') {
        renderChapter(capitulo4);
    } else if (chapterId === 'cap5' && typeof capitulo5 !== 'undefined') {
        renderChapter(capitulo5);
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    if (typeof capitulo1 !== 'undefined') {
        renderChapter(capitulo1);
    }
});

// --- SISTEMA DE BÚSQUEDA INTEGRADO Y SEGURO ---

document.addEventListener('DOMContentLoaded', () => {
    // Definimos la variable dentro del evento para asegurar que el HTML ya existe
    const searchInput = document.getElementById('globalSearch');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.concept-card');
    const allAccordionItems = document.querySelectorAll('.accordion-item');

    // 1. SI EL BUSCADOR ESTÁ VACÍO: Reset total
    if (term === "") {
        cards.forEach(card => card.style.display = "block");
        allAccordionItems.forEach(item => {
            item.style.display = "block"; // Asegurar que todo sea visible
            item.classList.remove('active');
        });
        return;
    }

    // 2. FILTRADO DE TARJETAS
    cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        const isMatch = text.includes(term);
        card.style.display = isMatch ? "block" : "none";

        if (isMatch) {
            // Abrir padres si hay coincidencia
            let parent = card.closest('.accordion-item');
            while (parent) {
                parent.classList.add('active');
                parent.style.display = "block"; // Asegurar que el padre sea visible
                parent = parent.parentElement.closest('.accordion-item');
            }
        }
    });

    // 3. OCULTAR NIVELES VACÍOS (La "Limpieza")
    // Revisamos cada acordeón de abajo hacia arriba
    allAccordionItems.forEach(item => {
        // Contamos cuántas tarjetas visibles hay dentro de este acordeón específico
        const hasVisibleCards = item.querySelectorAll('.concept-card[style="display: block;"]').length > 0;
        
        if (!hasVisibleCards) {
            item.style.display = "none"; // Si no tiene nada, desaparece la sección/subsección
        } else {
            item.style.display = "block"; // Si tiene algo, se mantiene
        }
        });

      // --- Lógica del mensaje de "No resultados" ---
        const visibleCards = document.querySelectorAll('.concept-card[style="display: block;"]').length;
        let noResultsMsg = document.getElementById('no-results-empty');

        if (visibleCards === 0 && term !== "") {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.id = 'no-results-empty';
                noResultsMsg.className = 'text-center py-20 animate-pulse'; // Estilo rápido con Tailwind
                noResultsMsg.innerHTML = `<p class="text-slate-500 text-lg">No encontramos nada para "${term}" 🔍🧐</p>`;
                document.getElementById('course-content').appendChild(noResultsMsg);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    });
    });


        // Evitar que el Enter recargue la página
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') e.preventDefault();
        });
    }

});