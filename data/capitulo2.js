// data/capitulo2.js
const capitulo2 = {
    id: "2",
    title: "Capítulo 2: Embeddings",
    parts: [
        {
            id: "2.1",
            title: "2.1 Tokenization",
            subsections: [
                {
                    subid: "2.1.1",
                    subtitle: "Notations",
                    description: "Definiciones fundamentales y notaciones para tokenización de texto.",
                    concepts: [
                        {
                            acronym: "Token",
                            name: "Token",
                            definition: "Unidad arbitrariamente definida de texto. Granularidades: (1) Word-level: 'teddy bear'→['teddy','bear'], fácil interpretar, pocas tokens pero vocabulario grande y no maneja OOV; (2) Subword-level (BPE, WordPiece): 'teddy bear'→['ted','##dy','bear'], vocabulario reducido, maneja OOV mejor pero implementación compleja; (3) Character-level: 'teddy'→['t','e','d','d','y'], vocabulario muy pequeño, resuelve OOV pero input muy largo y embeddings poco significativos; (4) Byte-level: usa encoding ASCII/UTF, maneja cualquier lenguaje pero input muy largo y patrones difíciles de interpretar."
                        },
                        {
                            acronym: "V",
                            name: "Vocabulary",
                            definition: "Conjunto fijo V de tokens predefinidos usado como referencia para convertir texto en tokens: V={token₁, token₂,...,token|V|}. Tamaño |V| depende de: (1) Granularidad (byte<character<subword<word), (2) Corpus (multilingüe>monolingüe). Incluye special tokens: [PAD] para rellenar hasta longitud máxima nₘₐₓ (útil para batch computations), [UNK] para entidades no en vocabulario."
                        },
                        {
                            acronym: "T",
                            name: "Tokenizer",
                            definition: "Proceso T que convierte entre texto y tokens. (1) Encode: texto→tokens para que modelo procese, (2) Decode: tokens→texto para traducir predicciones a lenguaje natural. Tipos: (a) Rule-based (T̂=T): no necesita entrenamiento (word/character-level), no aprovecha patrones de datos; (b) Learned (𝒟⟹T): necesita entrenamiento, mejores resultados al aprender patrones directamente de datos (BPE, WordPiece, Unigram)."
                        },
                        {
                            acronym: "Subword Design",
                            name: "Subword Tokenization Principles",
                            definition: "Razones por las que subword-level supera a word/character: (1) Leverage root meanings: 'run','runner','running' comparten raíz común, tokenización debe dividir texto reconociendo estas similitudes; (2) Reduce OOV occurrences: reconocer variaciones pequeñas ('bear'/'bears') minimiza palabras tratadas como desconocidas. Limitación de word/character-level: no aprovechan significado semántico de palabras."
                        },
                        {
                            acronym: "Normalization",
                            name: "Normalization Techniques",
                            definition: "Técnicas para estandarizar texto ante inconsistencias: (1) Casing: convertir a lowercase ('Teddy bear'→'teddy bear') evita variaciones por capitalización; (2) Accents: remover acentos ('knuddelbär'→'knuddelbar'), útil para francés/alemán/español/italiano; (3) Unicode: remover símbolos fuera de lo común ('teddy bear ©'→'teddy bear'). Asegura procesamiento uniforme del texto."
                        }
                    ]
                },
                {
                    subid: "2.1.2",
                    subtitle: "Subword Algorithms",
                    description: "Algoritmos más comunes para tokenización a nivel de subword.",
                    concepts: [
                        {
                            acronym: "BPE",
                            name: "Byte-Pair Encoding",
                            definition: "Método de tokenización que construye vocabulario aprendiendo de los pares más comunes en corpus. Training: (1) Initialize: dividir corpus en caracteres, contar ocurrencias→vocabulario inicial V de tamaño vᵢ; (2) Add elements: contar frecuencia de pares, seleccionar par más frecuente, fusionarlos y agregar a V, actualizar splits en corpus; (3) Finalize: repetir hasta |V|=vf>vᵢ, agregar tokens especiales como [UNK]. Encoding: dividir texto en caracteres, aplicar reglas de fusión sucesivamente en orden de inserción a V. Aplicaciones: GPT, LLaMA y mayoría de LLMs recientes."
                        },
                        {
                            acronym: "WordPiece",
                            name: "WordPiece Algorithm",
                            definition: "Variación de BPE que hace fusiones basándose en el par más probable (likelihood-based) en vez del más frecuente. Usado como tokenizer del modelo BERT. Mantiene estructura similar a BPE pero criterio de fusión diferente: selecciona pares que maximizan probabilidad en lugar de frecuencia absoluta."
                        },
                        {
                            acronym: "Unigram",
                            name: "Unigram Algorithm",
                            definition: "Método de tokenización subword que asume probabilidad de aparición de token es independiente de tokens previos. Training: (1) Initialize: comenzar con vocabulario arbitrariamente grande V de todos subconjuntos posibles de caracteres en corpus; (2) Refine: reducir elementos hasta tamaño deseado→compute probability usando EM algorithm (ℒ(V\\token)-ℒ(V)), prune vocabulary manteniendo top 80% de subwords que más aumentan loss (son necesarios), mantener siempre caracteres individuales. Encoding: (1) considerar todas segmentaciones posibles de palabra usando elementos de V, (2) computar probabilidad de cada segmentación P(seg)=P(token₁)×P(token₂)×..., (3) seleccionar segmentación con score más alto. Aplicaciones: modelo T5."
                        }
                    ]
                }
            ]
        },
        {
            id: "2.2",
            title: "2.2 Token Embeddings",
            description: "Métodos para encontrar representación vectorial de cada token del vocabulario.",
            subsections: [
                {
                    subid: "2.2.1",
                    subtitle: "One-hot Encodings",
                    description: "Tipo estándar y básico de encoding para tokens.",
                    concepts: [
                        {
                            acronym: "OHE",
                            name: "One-Hot Encoding",
                            definition: "Método que representa cada token i de vocabulario V con vector de tamaño |V| donde elemento i-ésimo es 1 y resto son 0: tokenᵢ→[0,...,0,1,0,...,0]. Limitaciones críticas: (1) Token similarity: vectores resultantes son ortogonales sin importar cercanía semántica (sinónimos deberían estar cerca, antónimos lejos, pero OHE no captura esto); (2) Dimensionality: dimensión del vector es tan grande como |V| ~10⁴-10⁵, aumenta significativamente requerimientos computacionales y uso de memoria (|V|≫1). No es método efectivo para NLP moderno."
                        }
                    ]
                },
                {
                    subid: "2.2.2",
                    subtitle: "Continuous Encodings",
                    description: "Métodos para incorporar significado semántico dentro de embeddings.",
                    concepts: [
                        {
                            acronym: "Word2vec",
                            name: "Word2vec",
                            definition: "Familia de métodos que genera token embeddings que son: (1) Continuous: cada dimensión es float; (2) Fixed dimension: dimensión dₘₒdₑₗ fija (~10²-10³) independiente de |V|, comprime información y reduce complejidad computacional. Arquitectura: red neuronal shallow con una capa oculta (|V|×dₘₒdₑₗ×|V|), capas Projection y Prediction. Después de entrenar, extraer embeddings xₑₘbₑd aprendidos de capa projection. Resultados: embeddings capturan relaciones intuitivas entre tokens mediante aritmética vectorial (ej: teddy bear-toy+plastic≈cotton)."
                        },
                        {
                            acronym: "CBOW",
                            name: "Continuous Bag Of Words",
                            definition: "Modelo word2vec que predice token target basado en promedio de embeddings de tokens de contexto. Idea: entrenar modelo que predice token target dado tokens circundantes (contexto C en cada lado), extraer embeddings aprendidos. Training: (1) Initialize network con hidden layer, fijar context size C; (2) Represent input: considerar OHEs de todos tokens dentro de ventana de contexto; (3) Forward pass: proyectar OHEs de contexto y promediarlos, pasar embedding resultante por output layer para predecir target→ℒ. Extraer embeddings de projection layer. Ventaja: tiempo de entrenamiento relativamente rápido (genera una predicción por token target)."
                        },
                        {
                            acronym: "Skip-gram",
                            name: "Skip-gram",
                            definition: "Modelo word2vec que predice tokens de contexto dentro de ventana fija dado el token target. Idea: entrenar modelo que predice tokens de contexto dado target, extraer embeddings aprendidos. Training: (1) Initialize network con hidden layer, fijar context size C; (2) Represent input: considerar OHE del token target; (3) Forward pass: después de proyectar OHE del target, predecir cada uno de sus tokens de contexto (2×C predicciones)→múltiples ℒ. Extraer embeddings de projection layer. Desventaja: entrenamiento más lento que CBOW porque cada target genera 2×C data points, aumentando tamaño de entrenamiento."
                        },
                        {
                            acronym: "Negative Sampling",
                            name: "Negative Sampling",
                            definition: "Técnica que simplifica función objetivo y reduce complejidad computacional al samplear pequeño número de ejemplos negativos en vez de considerar todos. Problema: en clasificación multi-clase, loss usa softmax que requiere sumar sobre todas clases V, muy costoso si |V| grande. Solución: reformular como clasificación binaria evitando suma costosa. Algorithm: dado target wₜ con vecino wₚ, (1) Identify positive: par (wₚ,wₜ) es ejemplo positivo; (2) Sample negatives: samplear conjunto de O(10) observaciones {wₙ∈N} donde wₙ no es vecino de wₜ→(wₙ,wₜ) ejemplos negativos; (3) Optimize: tratar como clasificación binaria→L=-log(σ(wₚ·wₜ))-Σwₙ∈N log(σ(-wₙ·wₜ)). Beneficio: solo sumar sobre N≪|V|, reducción significativa en tiempo con buena aproximación."
                        },
                        {
                            acronym: "GloVe",
                            name: "Global Vectors",
                            definition: "Técnica que aprovecha co-ocurrencias para derivar word embeddings. Idea: construir embeddings basados en información estadística de matriz de co-ocurrencia que cuantifica qué tan seguido aparecen pares de palabras juntas. Algorithm: (1) Construct co-occurrence matrix X: inicializar context window size, construir matriz donde Xᵢⱼ=número de veces que target word i ocurrió con context word j (matriz simétrica); (2) Model co-occurrence: modelar log(Xᵢⱼ) usando target embedding wₜ,ᵢ, context embedding wc,ⱼ y bias terms: log(Xᵢⱼ)≈wₜ,ᵢᵀwc,ⱼ+bₜ,ᵢ+bc,ⱼ; (3) Learn weights: gradient descent para minimizar weighted squared loss L=Σᵢ Σⱼ f(Xᵢⱼ)[log(Xᵢⱼ)̂-log(Xᵢⱼ)]² donde f es función de ponderación f(Xᵢⱼ)=(Xᵢⱼ/Xₘₐₓ)^α si Xᵢⱼ<Xₘₐₓ, 1 otherwise; (4) Deduce embeddings: dado simetría, embedding final w=(wₜ+wc)/2."
                        }
                    ]
                }
            ]
        },
        {
            id: "2.3",
            title: "2.3 Document Embeddings",
            description: "Métodos para codificar significado de sentencia aprovechando información de sus tokens.",
            subsections: [
                {
                    subid: "2.3.1",
                    subtitle: "Heuristic Methods",
                    description: "Métodos basados en reglas que funcionan bien a pesar de su simplicidad.",
                    concepts: [
                        {
                            acronym: "BOW",
                            name: "Bag Of Words",
                            definition: "Método que genera embeddings a nivel de documento considerando frecuencia de aparición de cada token, basándose en representaciones OHE. Proceso: (1) Construct vocabulary V con todos tokens del documento; (2) Count occurrence: asociar a cada palabra número de veces que apareció; (3) Build document vector: representar documento como vector de dimensión |V|, suma de frecuencias de palabras asociadas con sus OHE representations. Limitación principal: orden de tokens no importa en representación vectorial (frases con mismas palabras en diferente orden tienen mismo xBOW)."
                        },
                        {
                            acronym: "n-gram",
                            name: "n-gram Model",
                            definition: "Extensión de BOW que se basa en frecuencia de secuencias de n palabras consecutivas. Parámetro n≥1 con trade-off: (1) n más alto→considera más palabras co-localizadas pero frecuencias más sparse y mayor costo computacional; (2) n más bajo→frecuencias menos sparse y menor costo pero pierde contexto de co-localización. Nota: BOW es caso especial de n-gram con n=1."
                        },
                        {
                            acronym: "TF-IDF",
                            name: "Term Frequency-Inverse Document Frequency",
                            definition: "Método que considera tanto frecuencia de palabra en documento dado como su prevalencia en todos los documentos. Objetivo: filtrar palabras muy comunes (ej: 'the') y enfocarse en palabras más importantes. Factores: (1) Term frequency TF(t,d)=fₜ,d/Σₜ'∈d fₜ',d: ratio de veces que término t aparece en documento d sobre conteo de todos términos en d, normalizado por total de palabras en documento; (2) Inverse document frequency IDF(t,𝒟)=log(N𝒟/Nₜ,𝒟): función de total de documentos N𝒟 y documentos Nₜ,𝒟 donde aparece t→mientras más aparece t en documentos, más probable es palabra común y menos importante. TF-IDF(t,d,𝒟)=TF(t,d)×IDF(t,𝒟)."
                        }
                    ]
                },
                {
                    subid: "2.3.2",
                    subtitle: "Recurrent Neural Networks",
                    description: "Clase de modelos que fueron state-of-the-art por su desempeño en rango amplio de tareas NLP.",
                    concepts: [
                        {
                            acronym: "RNN",
                            name: "Recurrent Neural Network",
                            definition: "Tipo de red neuronal que mantiene hidden state auto-mutante para procesar inputs temporales. Arquitectura: considera inputs x⁽ᵗ⁾ y mantiene hidden states h⁽ᵗ⁾. Para cada timestep t: h⁽ᵗ⁾=A₁(Wₕₕh⁽ᵗ⁻¹⁾+Wₕₓx⁽ᵗ⁾+bₕ) y ŷ⁽ᵗ⁾=A₂(Wᵧₕh⁽ᵗ⁾+bᵧ) donde Wₕₕ,Wₕₓ,Wᵧₕ,bₕ,bᵧ son coeficientes compartidos temporalmente, A₁,A₂ funciones de activación. Training: loss L sobre todos time steps Tᵧ: L(ŷ,y)=ΣₜTᵧ L(ŷ⁽ᵗ⁾,y⁽ᵗ⁾). Backpropagation temporal en cada punto en tiempo: ∂L⁽ᵀ⁾/∂W=Σₜᵀ ∂L⁽ᵀ⁾/∂W|⁽ᵗ⁾. Problema: dificultad capturando dependencias long-term por vanishing gradient (gradientes muy pequeños durante backpropagation through time)."
                        },
                        {
                            acronym: "RNN Applications",
                            name: "RNN Application Cases",
                            definition: "RNNs se usan en diferentes aplicaciones cambiando input length Tₓ y output length Tᵧ: (1) One-to-one (Tₓ=1,Tᵧ=1): red neuronal tradicional; (2) One-to-many (Tₓ=1,Tᵧ>1): generación de texto/música, input palabra→output resto de sentencia; (3) Many-to-one (Tₓ>1,Tᵧ=1): clasificación de sentimiento, input sentencia→output positivo/negativo; (4) Many-to-many (Tₓ=Tᵧ): name entity recognition, input sentencia→output clasificación word-level; (5) Many-to-many (Tₓ≠Tᵧ): traducción automática, input sentencia en idioma origen→output sentencia en idioma destino."
                        },
                        {
                            acronym: "Gate",
                            name: "Gate Mechanism",
                            definition: "Mecanismo para mitigar vanishing gradient problem con gates que tienen propósito bien definido. Output de gate G: ΓG(h⁽ᵗ⁻¹⁾,x⁽ᵗ⁾)=σ(WG[h⁽ᵗ⁻¹⁾,x⁽ᵗ⁾]+bG) donde ΓG∈[0,1], WG matriz y bG bias específicos de gate G, [h⁽ᵗ⁻¹⁾,x⁽ᵗ⁾] concatenación de hidden state e input. Tipos: (1) Input/Update gate Γᵢ: filtrar información útil del input (Γᵢ→0 ignorar nueva info, Γᵢ→1 incluir nueva info), usado en GRU/LSTM; (2) Forget/Reset gate Γf: decidir qué información descartar (Γf→0 olvidar info, Γf→1 mantener info), usado en GRU/LSTM; (3) Output gate Γₒ: decidir siguiente hidden state (Γₒ→0 no output de estado actual, Γₒ→1 output todo de estado actual), usado en LSTM."
                        },
                        {
                            acronym: "GRU",
                            name: "Gated Recurrent Unit",
                            definition: "Arquitectura basada en RNN que deja fluir información útil temporalmente mediante gates especiales. Mantiene cell state c⁽ᵗ⁾ además de hidden state h⁽ᵗ⁾. Usa 2 gates (Γᵢ,Γf): hidden state previo h⁽ᵗ⁻¹⁾ se actualiza y fusiona con cell state previo vía input gate Γᵢ, partes relevantes de h⁽ᵗ⁻¹⁾ interactúan con input actual x⁽ᵗ⁾ y se guardan en updated cell state c̃⁽ᵗ⁾. Ecuaciones: c̃⁽ᵗ⁾=tanh(Wc[Γf⊙h⁽ᵗ⁻¹⁾,x⁽ᵗ⁾]+bc) potential new cell state; c⁽ᵗ⁾=Γᵢ⊙c̃⁽ᵗ⁾+(1-Γᵢ)⊙c⁽ᵗ⁻¹⁾ combinación de estado previo ponderado por cuánto olvidar y cell candidate ponderado por cuánto mantener; h⁽ᵗ⁾=c⁽ᵗ⁾ cell state y hidden state son iguales en GRU. Beneficio: mitiga vanishing gradient manteniendo información fluyendo y olvidando partes relevantes con complejidad computacional relativamente simple. Existen múltiples variantes GRU."
                        },
                        {
                            acronym: "LSTM",
                            name: "Long-Short Term Memory",
                            definition: "Generalización de arquitectura GRU que agrega gates para ayudar al modelo a recordar información del pasado y olvidar partes no relevantes. Usa 3 gates (Γᵢ,Γf,Γₒ). Ecuaciones: c̃⁽ᵗ⁾=tanh(Wc[h⁽ᵗ⁻¹⁾,x⁽ᵗ⁾]+bc) potential new cell state usando hidden state previo y input actual; c⁽ᵗ⁾=Γf⊙c⁽ᵗ⁻¹⁾+Γᵢ⊙c̃⁽ᵗ⁾ combinación de estado previo ponderado por Γf (cuánto olvidar) y cell candidate ponderado por Γᵢ (cuánto mantener); h⁽ᵗ⁾=Γₒ⊙tanh(c⁽ᵗ⁾) output gate Γₒ deja fluir información necesaria aplicado a updated cell state vía tanh. Ventajas: retener información por periodo más largo gracias a gates especiales. Desventajas: entrenamiento más largo por complejidad agregada. Existen varias variaciones LSTM."
                        },
                        {
                            acronym: "ELMo",
                            name: "Embeddings from Language Models",
                            definition: "Arquitectura usando bidirectional LSTMs que produce word embeddings context-aware, se basa en información character-level haciéndola robusta a palabras OOV. Arquitectura: stack de L capas bidirectional LSTM, permite que embedding de cada token sea función de tokens tanto de izquierda como derecha. Proceso: (1) Tokenize input: dividir en caracteres con dimensión dchₐᵣ, aplicar convolutions para representaciones n-gram character por palabra→dwoᵣd; (2) Compute hidden representation: para token en posición t en capa l∈[[1,L]], considerar left-to-right hidden state h⃗ₜ,ₗ (considera tokens 1,...,t-1) y right-to-left hidden state h⃖ₜ,ₗ (considera tokens n,...,t+1); (3) Compute final embedding: concatenar ambos hidden states de última capa ŷₜ=[h⃗ₜ,L,h⃖ₜ,L]. Embedding ELMo de token es función de sentencia en que está, permitiendo que contexto relevante sea parte de él. Training: (1) General pretraining: entrenar modelo self-supervised en set grande de datos; (2) Task-specific finetuning: usar combinación lineal de hidden states ŷₜᵗᵃˢᵏ=γᵗᵃˢᵏ ΣₗL αₗᵗᵃˢᵏ[h⃗ₜ,L,h⃖ₜ,L] donde γᵗᵃˢᵏ y αₗᵗᵃˢᵏ son parámetros task-specific y entrenables. Naturaleza bidireccional permite a capas ocultas considerar información de todas partes del input."
                        }
                    ]
                },
                {
                    subid: "2.3.3",
                    subtitle: "Attention-based Methods",
                    description: "Concepto de attention que permite al modelo enfocarse directamente en tokens pasados en vez de depender solo de estado auto-mutante único.",
                    concepts: [
                        {
                            acronym: "Attention Motivation",
                            name: "Motivation for Attention",
                            definition: "LSTMs y GRUs intentan resolver vanishing gradient con gating mechanisms, pero métodos imperfectos en práctica. En traducción automática donde traducimos sentencia de longitud Tₓ, mantener seguimiento de esos tokens pasados juega rol crucial. Idea: introducir grados adicionales de libertad inyectando contexto que es función directa de tokens pasados, en vez de depender solo de hidden state que se va mutando."
                        },
                        {
                            acronym: "Attention Weights",
                            name: "Attention-based Weights",
                            definition: "Para token en posición i, introducir contexto cᵢ que contiene información pasada a inyectar, función explícita de tokens pasados en posiciones j∈[[1,Tₓ]] vía su hidden state hⱼ: cᵢ=Σⱼᵀˣ αᵢ,ⱼhⱼ donde αᵢ,ⱼ representa cuánto token en posición i debe prestar atención a token pasado en posición j. Para interpretar αᵢ,ⱼ como probabilidad (Σⱼᵀˣαᵢ,ⱼ=1), representar como resultado de softmax: αᵢ,ⱼ=exp(eᵢ,ⱼ)/ΣⱼᵀˣExp(eᵢ,ⱼ). Término eᵢ,ⱼ es output de alignment model A que es función de hidden state hᵢ₋₁ que se está inputeando en posición i y hidden state hⱼ de token pasado j∈[[1,Tₓ]]."
                        }
                    ]
                }
            ]
        },
        {
            id: "2.4",
            title: "2.4 Embedding Operations",
            description: "Operaciones principales que se pueden realizar sobre embeddings.",
            subsections: [
                {
                    subid: "2.4.1",
                    subtitle: "Similarity",
                    description: "Métodos para cuantificar similitud entre embeddings.",
                    concepts: [
                        {
                            acronym: "Vector Norm",
                            name: "Vector Norm",
                            definition: "Número cuantificado de medida de vector x∈Rⁿ. Tipos: (1) L₁ Manhattan ||x||₁=|x₁|+...+|xₙ|, robusto a outliers, promueve sparsity (LASSO) pero no diferenciable en todas partes y poco intuitivo; (2) L₂ Euclidean ||x||₂=√(x₁²+...+xₙ²), intuitivo y diferenciable pero sensible a outliers y computacionalmente costoso cuando n alto; (3) Lₚ General ||x||ₚ=(x₁ᵖ+...+xₙᵖ)^(1/p), flexible y customizable ajustando p pero difícil elegir p óptimo y complejidad computacional agregada especialmente si p∉ℕ*; (4) L∞ Maximum ||x||∞=max(x₁,...,xₙ), simple de computar y útil para bounding constraints pero sensible a outliers. Por default usar L₂ norm y notar ||.||=||.||₂."
                        },
                        {
                            acronym: "Cosine Similarity",
                            name: "Cosine Similarity",
                            definition: "Medida de similitud entre dos tokens t₁ y t₂ que considera ángulo θ formado por sus representaciones vectoriales asociadas: similarity=(t₁·t₂)/(||t₁||||t₂||)=cos(θ). Valores cercanos a 1 indican alta similitud (ángulo pequeño), valores cercanos a 0 indican baja similitud (ángulo ~90°), valores cercanos a -1 indican oposición (ángulo ~180°). Útil porque normaliza por magnitud de vectores, enfocándose solo en dirección."
                        }
                    ]
                },
                {
                    subid: "2.4.2",
                    subtitle: "Dimension Reduction",
                    description: "Métodos para visualizar embeddings de alta dimensión en un espacio de menor dimensión.",
                    concepts: [
                        {
                            acronym: "t-SNE",
                            name: "t-distributed Stochastic Neighbor Embedding",
                            definition: "Técnica de reducción de dimensionalidad no lineal que busca preservar la estructura local de los datos. Es particularmente útil para la visualización de clusters en 2D o 3D, ya que mantiene los puntos similares cercanos entre sí en el espacio reducido, aunque no preserva bien las distancias globales."
                        },
                        {
                            acronym: "PCA",
                            name: "Principal Component Analysis",
                            definition: "Método lineal que transforma los datos a un nuevo sistema de coordenadas (componentes principales) de tal manera que la mayor varianza posible se proyecte en los primeros ejes. A diferencia de t-SNE, es determinista y busca preservar la estructura global y la dispersión de los datos."
                        }
                    ]
                },
                {
                    subid: "2.4.3",
                    subtitle: "Fast retrieval",
                    description: "Técnicas de búsqueda aproximada para encontrar vectores similares de manera eficiente en grandes volúmenes de datos.",
                    concepts: [
                        {
                            acronym: "ANN",
                            name: "Approximate Nearest Neighbor",
                            definition: "Categoría de algoritmos que permiten encontrar elementos cercanos en un espacio vectorial de forma rápida, sacrificando la precisión exacta por la velocidad de cómputo. Incluye variantes como LSH, árboles KD y escaneo lineal[cite: 196]."
                        },
                        {
                            acronym: "LSH",
                            name: "Locality-Sensitive Hashing",
                            definition: "Algoritmo ANN que proyecta vectores aleatoriamente en cubetas ('buckets'). La idea es que los vectores similares tengan una alta probabilidad de colisionar en la misma cubeta[cite: 193]. Se compone de: (1) Proyección aleatoria de los n elementos en 2ᴷ cubetas; (2) Verificación dentro de la misma cubeta comparando solo ese subconjunto pequeño para confirmar la similitud."
                        }
                    ]
                }
            ]
        }
    ]
};