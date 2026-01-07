// data/capitulo1.js
const capitulo1 = {
    id: "1",
    title: "Capítulo 1: Fundamentos",
    parts: [
        {
            id: "1.1",
            title: "1.1 Neural Networks",
            subsections: [
                {
                    subid: "1.1.1",
                    subtitle: "Overview",
                    description: "Introducción a los conceptos fundamentales de las redes neuronales y su arquitectura básica.",
                    concepts: [ {
                    acronym: "NN",
                    name: "Neural Network",
                    definition: "Modelo inspirado en el cerebro y es la unidad básica de aprendizaje profundo. Se compone de neuronas interconectadas que procesan información mediante pesos ajustables, permitiendo que la máquina aprenda patrones complejos que no son lineales."
                },
                {
                    acronym: "FFNN",
                    name: "Feed-Forward Neural Network",
                    definition: "La arquitectura más simple donde la información viaja en una sola dirección: desde la entrada (Input), pasando por capas ocultas (Hidden) que extraen características, hasta la salida (Output) que da la predicción final.\n\n🔎 A mayor número de capas ocultas, más profunda es la red. Redes con pocas capas (k ≤ 3) se consideran shallow networks."
                }
                ]
                },
                {
                    subid: "1.1.2",
                    subtitle: "Components",
                    description: "Componentes detallados de las redes neuronales: entrada, capas ocultas, funciones de activación y salida.",
                    concepts: [ {
                    acronym: "Input",
                    name: "Input Layer",
                    definition: "Vector de embedding i ∈ ℝᵐ. Puede representar texto (embeddings), audio (espectrogramas) o imágenes (píxeles). \n\n💡 Idea clave: independientemente de la modalidad, todo se traduce a vectores numéricos."
                },
                {
                    acronym: "Hidden",
                    name: "Hidden Layer",
                    definition: "Capa que transforma la entrada usando pesos (W), sesgos (b) y activaciones (A) para aprender patrones. Formalmente: z = W·x + b con output = A(z).\n El cálculo se implementa eficientemente mediante multiplicaciones matriciales."
                },
                {
                    acronym: "Output",
                    name: "Output Layer",
                    definition: "Devuelve la predicción final o ∈ ℝⁿ.\n Permiten un flujo de información más controlado y mejoran el rendimiento en modelos grandes"
                },
                {
                    acronym: "Sigmoid",
                    name: "Sigmoid Function",
                    definition: "σ(z) = 1/(1+e⁻ᶻ). Transforma cualquier valor a un rango entre 0 y 1. Es ideal para predicciones de probabilidad, aunque sufre del problema de \"gradiente desvaneciente\".",
                },
                {
                    acronym: "ReLU",
                    name: "Rectified Linear Unit",
                    definition: "max(0,z). Rango [0,+∞). Es la más usada hoy en día. Si el valor es negativo, lo vuelve 0; si es positivo, lo deja igual. \n\n⚠️ Nota técnica: Es computacionalmente muy eficiente, aunque no es diferenciable en 0."
                },
                {
                    acronym: "Leaky ReLU",
                    name: "Leaky Rectified Linear Unit",
                    definition: "Variante de ReLU definida como max(εz, z) con ε ≪ 1 (típicamente 0.01). Soluciona el problema de neuronas muertas permitiendo un pequeño gradiente negativo cuando z < 0. Mantiene los beneficios de ReLU mientras previene la muerte neuronal."
                },
                {
                    acronym: "GELU",
                    name: "Gaussian Error Linear Unit",
                    fullName: "Unidad Lineal de Error Gaussiano",
                    definition: "Función de activación z·P(X ≤ z) donde X ~ N(0,1). Proporciona una transición más suave que ReLU. Es la activación estándar en transformers modernos (BERT, GPT-3, GPT-4) por su mejor rendimiento empírico. Rango de salida: aproximadamente (-0.17, +∞)."
                },
                {
                    acronym: "ELU",
                    name: "Exponential Linear Unit",
                    fullName: "Unidad Lineal Exponencial",
                    definition: "Función max(α(e^z - 1), z) con α ≈ 1. Combina beneficios de ReLU con outputs negativos suaves. Ayuda a que las activaciones estén centradas en cero. Computacionalmente más costosa que ReLU pero puede converger más rápido."
                },
                {
                    acronym: "GLU",
                    name: "Gated Linear Unit",
                    fullName: "Unidad Lineal con Compuerta",
                    definition: "Función de activación con mecanismo de compuerta: A(z) = A₁(z) ⊙ A₂(z), donde ⊙ es multiplicación elemento a elemento. GLU usa σ(zW+b) como compuerta. Permite al modelo aprender qué información dejar pasar dinámicamente."
                },
                {
                    acronym: "SwiGLU",
                    name: "Swish Gated Linear Unit",
                    fullName: "Unidad Lineal con Compuerta Swish",
                    definition: "Variante de GLU que usa (zW+b) ⊙ σ(β(zW+b)) donde β es aprendible. Combina la suavidad de Swish con el control de gating. Muy efectiva en transformers grandes. Usada en modelos como PaLM y LLaMA."
                },
                {
                    acronym: "ReGLU",
                    name: "Rectified Gated Linear Unit",
                    fullName: "Unidad Lineal con Compuerta Rectificada",
                    definition: "Variante de GLU usando ReLU(zW+b) como función de gating. Mantiene la simplicidad de ReLU con el poder expresivo del gating. Usada en algunos modelos de lenguaje por su balance entre eficiencia y rendimiento."
                },
                {
                    acronym: "Softmax",
                    name: "Softmax Function",
                    definition: "Convierte el vector de salida en una distribución de probabilidad donde la suma es 1. Usada en clasificación."
                }
            ]
                }
            ]
        },
        {
            id: "1.2",
            title: "1.2 Training",
            description: "Procesos, algoritmos y técnicas para el aprendizaje de parámetros.",
            subsections: [ // <--- IMPORTANTE: Todo debe ir dentro de este array
                {
                    subid: "1.2.1",
                    subtitle: "Parameter Learning",
                    description: "Introducción a los conceptos fundamentales...",
                    concepts: [ 
                    {
                        acronym: "Xavier/Glorot",
                        name: "Xavier Initialization",
                        fullName: "Inicialización Xavier/Glorot",
                        definition: "Método de inicialización de pesos para activaciones Sigmoid/Tanh. Uniforme: U[-√(6/(nᵢ+nₒ)), √(6/(nᵢ+nₒ))]. Normal: N(0, √(2/(nᵢ+nₒ))). Mantiene la varianza de activaciones y gradientes similar entre capas, evitando desvanecimiento/explosión. nᵢ = neuronas entrada, nₒ = neuronas salida."
                    },
                    {
                        acronym: "He Init",
                        name: "He Initialization",
                        fullName: "Inicialización He",
                        definition: "Método de inicialización óptimo para ReLU y derivados. Uniforme: U[-√(6/nᵢ), √(6/nᵢ)]. Normal: N(0, √(2/nᵢ)). Diseñado específicamente para funciones de activación que tienen z=0 como punto de inflexión. Esencial para redes profundas con ReLU."
                    },
                    {
                        acronym: "Epoch",
                        name: "Training Epoch",
                        fullName: "Época de Entrenamiento",
                        definition: "Una iteración completa donde el modelo ve todo el conjunto de entrenamiento una vez. Relacionados: N (tamaño entrenamiento), b (batch size), s (steps por época). Fórmula: N = b × s. El entrenamiento típicamente requiere múltiples épocas (10-1000+) para convergencia."
                    },
                    {
                        acronym: "Batch Size",
                        name: "Batch Size",
                        fullName: "Tamaño de Lote",
                        definition: "Número de observaciones procesadas simultáneamente en cada paso. Mini-batch típico: 32, 64, 128, 256 (potencias de 2 para optimización hardware). Batch grande: gradiente más estable pero más memoria. Batch pequeño: más ruidoso pero mejor generalización. Trade-off clave en entrenamiento."
                    },
                    {
                        acronym: "Loss",
                        name: "Loss Function",
                        fullName: "Función de Pérdida",
                        definition: "Función L(ŷ, y) que cuantifica la diferencia entre predicciones ŷ y valores reales y. Valores más altos = peor rendimiento. El objetivo del entrenamiento es minimizar L. Escrita como L(θ) para indicar dependencia de parámetros del modelo."
                    },
                    {
                        acronym: "Hard Label",
                        name: "Hard Label",
                        fullName: "Etiqueta Dura",
                        definition: "Etiqueta binaria donde cada observación pertenece (yᵢ=1) o no (yᵢ=0) a clase i. Usada en clasificación de imágenes tradicional. Ejemplo: una imagen es 100% 'gato' o 100% 'perro', sin ambigüedad. No captura incertidumbre."
                    },
                    {
                        acronym: "Soft Label",
                        name: "Soft Label",
                        fullName: "Etiqueta Suave",
                        definition: "Etiqueta probabilística donde yᵢ ∈ [0,1] indica la probabilidad de pertenecer a clase i. Común en NLP para predicción de siguiente palabra donde múltiples completaciones son válidas. Ejemplo: 'El oso es...' → 50% 'grande', 30% 'peludo', 20% 'salvaje'. Captura incertidumbre."
                    },
                    {
                        acronym: "Backprop",
                        name: "Backpropagation",
                        fullName: "Retropropagación",
                        definition: "Algoritmo fundamental para entrenar redes neuronales. Calcula gradientes ∇L(θ) mediante regla de la cadena desde la salida hacia la entrada. Tres pasos: (1) Forward pass: calcular ŷ y L, (2) Backward pass: calcular ∂L/∂θᵢ para cada parámetro, (3) Update: ajustar θᵢ en dirección que reduce L."
                    },
                    {
                        acronym: "Grad Clip",
                        name: "Gradient Clipping",
                        fullName: "Recorte de Gradiente",
                        definition: "Técnica para prevenir explosión de gradientes. Limita la norma del gradiente ||∇L|| a un valor máximo C. Si ||∇L|| > C, se escala a C. Previene actualizaciones de pesos de magnitud no deseada. Esencial en RNNs y transformers. Típicamente C ∈ [1, 5]."
                    },
                    {
                        acronym: "LR / α / η",
                        name: "Learning Rate",
                        fullName: "Tasa de Aprendizaje",
                        definition: "Hiperparámetro que controla la magnitud de actualización de pesos. Muy bajo: convergencia lenta, puede quedar atrapado en mínimos locales. Ideal: converge eficientemente al óptimo. Muy alto: puede divergir o saltar sobre el óptimo. Puede ser fijo o seguir un schedule (decay, warmup, etc.)."
                    },
                    {
                        acronym: "Warmup",
                        name: "Learning Rate Warmup",
                        fullName: "Calentamiento de Tasa de Aprendizaje",
                        definition: "Técnica que usa LR bajo durante los primeros sₗᵥ steps (warmup steps) para prevenir overfitting temprano. El LR aumenta gradualmente hasta alcanzar el valor objetivo. Fórmula típica: α(s) = C·min(1/√s, s/sₗᵥ^(3/2)). Crítico en transformers grandes. Previene cambios dramáticos por gradientes ruidosos iniciales."
                    }
                ]
                },
                {
                    subid: "1.2.2",
                    subtitle: "Optimizers",
                    description: "Algoritmos que actualizan los parámetros del modelo para minimizar la pérdida. Cada uno tiene diferentes estrategias para calcular y aplicar las actualizaciones basándose en los gradientes.",
                    concepts: [
                    {
                        acronym: "GD",
                        name: "Gradient Descent",
                        definition: "Optimizador básico que actualiza parámetros en dirección del mayor descenso: θₜ₊₁ = θₜ - α∇L(θₜ). Tres variantes: (1) Stochastic: usa 1 observación (rápido, ruidoso), (2) Mini-batch: usa subconjunto (balance óptimo), (3) Batch: usa todo el dataset (estable, costoso). Mini-batch es el estándar."
                    },
                    {
                        acronym: "SGD",
                        name: "Stochastic Gradient Descent",
                        definition: "Variante de GD que calcula pérdida y gradiente usando una sola observación por iteración. Ventajas: bajo consumo de memoria, muchas actualizaciones por época. Desventajas: gradiente muy ruidoso, convergencia errática. En práctica, 'SGD' suele referirse a mini-batch GD."
                    },
                    {
                        acronym: "Momentum",
                        name: "Momentum Optimizer",
                        definition: "Optimizador que acelera convergencia considerando gradientes previos. Actualización: vₜ₊₁ = βvₜ + (1-β)∇L(θₜ), luego θₜ₊₁ = θₜ - αvₜ. β típicamente 0.9. Reduce oscilaciones, ayuda a escapar mínimos locales. Como una bola rodando que acumula inercia. Suaviza la trayectoria de optimización."
                    },
                    {
                        acronym: "RMSProp",
                        name: "Root Mean Square Propagation",
                        definition: "Optimizador con tasas de aprendizaje adaptativas. Mantiene promedio móvil de gradientes al cuadrado: vₜ₊₁ = βvₜ + (1-β)(∇L(θₜ))². Actualiza: θₜ₊₁ = θₜ - α·∇L(θₜ)/√(vₜ+ε). α típicamente 0.001, β = 0.9. Normaliza gradientes, previene desvanecimiento/explosión. Parámetros con gradientes grandes tienen LR efectivo menor."
                    },
                    {
                        acronym: "Adam",
                        name: "Adaptive Moment Estimation",
                        definition: "Optimizador más popular que combina Momentum + RMSProp. Mantiene dos promedios móviles: mₜ (primer momento, gradiente), vₜ (segundo momento, gradiente²). Actualización: θₜ₊₁ = θₜ - α·mₜ/√(vₜ+ε). Hiperparámetros: α=0.001, β₁=0.9, β₂=0.999. Tasas de aprendizaje adaptativas + momentum. Estándar en deep learning."
                    },
                    {
                        acronym: "AdamW",
                        name: "Adam with Weight Decay",
                        definition: "Variante de Adam que separa weight decay de la regularización L2. Elimina el término L2 del gradiente y lo incorpora directamente en la actualización de pesos. Mejora convergencia y generalización. Estándar en entrenamiento de transformers (BERT, GPT). Previene interferencia entre regularización y tasas adaptativas."
                    },
                    {
                        acronym: "Adafactor",
                        name: "Adafactor Optimizer",
                        definition: "Extensión de Adam que reduce requisitos de memoria mediante aproximación de bajo rango de gradientes al cuadrado. En lugar de guardar matriz completa de segundos momentos, usa factorización. Crítico para entrenar modelos enormes (ej: T5, PaLM). Trade-off: menos memoria por aproximación potencialmente menos precisa."
                    }
                ]
                },
                {
                    subid: "1.2.3",
                    subtitle: "Common Loss Functions",
                    description: "Las funciones de pérdida cuantifican qué tan lejos están las predicciones del modelo de los valores reales.",
                    concepts: [ 
                    {
                        acronym: "CE",
                        name: "Cross-Entropy Loss",
                        definition: "Función de pérdida estándar para clasificación. Mide divergencia entre distribuciones de probabilidad predicha y real. Multi-clase: CE(ŷ,y) = -Σᵢ yᵢ·log(ŷᵢ). Penaliza fuertemente predicciones confiadas pero incorrectas. Valores: [0, +∞), donde 0 = predicción perfecta. Usada con softmax en capa final."
                    },
                    {
                        acronym: "BCE",
                        name: "Binary Cross-Entropy",
                        definition: "Caso especial de CE para clasificación binaria (y ∈ {0,1}). Fórmula: BCE(ŷ,y) = -[y·log(ŷ) + (1-y)·log(1-ŷ)]. Cuando y=1, solo el primer término importa. Cuando y=0, solo el segundo. Usada con sigmoid en salida. Crítica en detección, clasificación binaria."
                    },
                    {
                        acronym: "KL Div",
                        name: "Kullback-Leibler Divergence",
                        definition: "Medida de diferencia entre dos distribuciones de probabilidad P y Q. Fórmula: KL(P||Q) = Σᵢ pᵢ·log(pᵢ/qᵢ). NO es simétrica: KL(P||Q) ≠ KL(Q||P). Valores: [0, +∞) donde 0 = distribuciones idénticas. Aplicaciones: NLP, compresión, VAEs, t-SNE, destilación de conocimiento."
                    },
                    {
                        acronym: "MAE",
                        name: "Mean Absolute Error",
                        definition: "Función de pérdida L1 para regresión. Fórmula: MAE = (1/n)·Σᵢ|ŷᵢ-yᵢ|. Menos sensible a outliers que MSE (contribución lineal vs cuadrática). Buena elección cuando outliers no deben dominar la pérdida. Gradiente constante. No diferenciable en 0. Interpretación: error promedio en unidades originales."
                    },
                    {
                        acronym: "MSE",
                        name: "Mean Squared Error",
                        definition: "Función de pérdida L2 para regresión. Fórmula: MSE = (1/n)·Σᵢ(ŷᵢ-yᵢ)². MÁS sensible a outliers (errores grandes contribuyen cuadráticamente). Diferenciable en todos lados. Penaliza errores grandes desproporcionadamente. Usada en regresión estándar. Unidades: cuadrado de la variable objetivo."
                    },
                    {
                        acronym: "RMSE",
                        name: "Root Mean Squared Error",
                        definition: "RMSE = √MSE. Ventaja sobre MSE: mismas unidades que variable objetivo, más interpretable. Mantiene sensibilidad a outliers de MSE. Común en benchmarks y reportes. Ejemplo: si predices precios en $, RMSE también está en $, mientras MSE estaría en $²."
                    }   
                    
                ]
                },
                {
                    subid: "1.2.2",
                    subtitle: "Regularization",
                    description: "Técnicas de regularización previenen el overfitting forzando al modelo a aprender patrones generales en lugar de memorizar el conjunto de entrenamiento.",
                    concepts: [ 
                    {
                        acronym: "Dropout",
                        name: "Dropout Regularization",
                        fullName: "Regularización por Dropout",
                        definition: "Técnica que aleatoriamente 'apaga' neuronas con probabilidad p durante entrenamiento. Training: cada neurona se dropea con prob p, forzando redundancia. Inference: ninguna se dropea, pero activaciones se escalan por (1-p) para compensar. Previene co-adaptación de neuronas. p típicamente 0.5 para capas ocultas, 0.1-0.2 para entrada."
                    },
                    {
                        acronym: "L1 Reg",
                        name: "L1 Regularization / LASSO",
                        fullName: "Regularización L1 / LASSO",
                        definition: "Penaliza suma de valores absolutos de pesos: L + λ||θ||₁ con λ>0. Produce sparsity: muchos pesos se vuelven exactamente 0. Excelente para feature selection automática. Contorno: forma de diamante. Trade-off: λ grande = más sparsity pero posible underfitting. Útil cuando muchos features son irrelevantes."
                    },
                    {
                        acronym: "L2 Reg",
                        name: "L2 Regularization / Ridge",
                        fullName: "Regularización L2 / Ridge",
                        definition: "Penaliza suma de cuadrados de pesos: L + λ||θ||₂² con λ>0. Reduce magnitud de coeficientes pero raramente los hace 0. Contorno: forma circular. Prefiere soluciones con pesos pequeños y distribuidos. Equivalente a prior Gaussiano en perspectiva Bayesiana. Más común que L1 en deep learning."
                    },
                    {
                        acronym: "Elastic Net",
                        name: "Elastic Net Regularization",
                        fullName: "Regularización Elastic Net",
                        definition: "Combina L1 y L2: L + λ[(1-α)||θ||₁ + α||θ||₂²] con λ>0, α∈[0,1]. α=0: puro L1 (sparsity). α=1: puro L2 (shrinkage). α intermedio: balance entre feature selection y coeficientes pequeños. Útil cuando hay grupos de features correlacionados."
                    },
                    {
                        acronym: "Early Stop",
                        name: "Early Stopping",
                        fullName: "Parada Temprana",
                        definition: "Detiene entrenamiento cuando pérdida de validación deja de mejorar o empieza a empeorar. Monitorea Lᵥₐₗ cada época. Si no mejora por n épocas (patience), detiene y restaura mejores pesos. Previene overfitting sin modificar arquitectura. Simple pero muy efectivo. Parámetros típicos: patience=5-20 épocas."
                    },
                    {
                        acronym: "BN",
                        name: "Batch Normalization",
                        definition: "Normaliza entradas a través de batch. Proceso: (1) Calcula μ y σ² del batch, (2) Normaliza: x̂=(x-μ)/√(σ²+ε), (3) Escala/desplaza: BN(x)=γx̂+β donde γ,β aprendibles. Beneficios: estabiliza entrenamiento, permite LR mayores, reduce dependencia de inicialización, actúa como regularización."
                    }
                ]
                }
            ]
        },
        {
            id: "1.3",
            title: "1.3 Evaluation",
            description: "Métricas y metodologías para medir el rendimiento del modelo.",
            subsections: [ // <--- IMPORTANTE: Todo debe ir dentro de este array
                {
                    subid: "1.3.1",
                    subtitle: "Data Splits",
                    description: "División correcta de datos para entrenamiento, validación y prueba.",
                    concepts: [
                    {
                        acronym: "Train Set",
                        name: "Training Set",
                        definition: "Datos para que modelo aprenda patrones: f(xₜᵣₐᵢₙ)→ŷ, minimizando L(ŷ,yₜᵣₐᵢₙ). Debe ser: (1) Grande para capturar patrones, (2) Representativo de población, (3) Alta calidad (sin duplicados, con edge cases). Típicamente 60-80% del dataset. Único conjunto donde modelo 've' etiquetas durante entrenamiento."
                    },
                    {
                        acronym: "Val Set",
                        name: "Validation Set",
                        definition: "Datos para tuning de hiperparámetros y selección de modelo. Permite comparar arquitecturas, ajustar LR, determinar early stopping. Debe ser: (1) Proxy representativo, (2) Tamaño balanceado, (3) Independiente de train. Típicamente 10-20%. También llamado dev set."
                    },
                    {
                        acronym: "Test Set",
                        name: "Test Set",
                        definition: "SOLO para reportar resultados finales. Mide generalización en datos no vistos. NUNCA para decisiones de entrenamiento/arquitectura. Pitfalls: (1) Contaminación, (2) Feature leakage, (3) Distribution mismatch. Típicamente 10-20%."
                    },
                    {
                        acronym: "Cross-Val",
                        name: "Cross-Validation",
                        definition: "Divide datos en k folds, entrena k veces (cada vez con fold diferente para validación). k-fold típico: k=5 o 10. Reduce dependencia de split específico. Ventaja: usa mejor datos. Desventaja: k veces más costoso. Poco práctico en DL por tiempo. Común en ML tradicional."
                    },
                    {
                        acronym: "Data Contam",
                        name: "Data Contamination",
                        definition: "Observaciones del test en train (duplicados, leakage). Causa métricas infladas artificialmente. Modelo memoriza en lugar de generalizar. Verificar con hashing. En LLMs: problema cuando datos de eval filtraron en corpus de pretraining."
                    },
                    {
                        acronym: "Feature Leak",
                        name: "Feature Leakage",
                        definition: "Usar info del test durante training indirectamente. Ejemplo: normalizar todo dataset antes de split (constantes incluyen info test). Solución: fit transformaciones SOLO en train, aplicar a val/test. También: usar features no disponibles en producción (info del futuro)."
                    }
                ]
                },
                {
                    subid: "1.3.2",
                    subtitle: "Metrics",
                    description: "Métricas para evaluar el rendimiento de modelos de clasificación.",
                    concepts: [
                    {
                        acronym: "CM",
                        name: "Confusion Matrix",
                        definition: "Tabla 2×2 para clasificación binaria: TP (predijo +, es +), TN (predijo -, es -), FP (predijo +, es -), FN (predijo -, es +). Visualiza tipos de errores. Extensible a multi-clase (matriz k×k). Base para precision, recall, F1, accuracy."
                    },
                    {
                        acronym: "Accuracy",
                        name: "Accuracy",
                        definition: "Porcentaje correcto: (TN+TP)/(TN+FN+FP+TP). Simple e intuitiva. PROBLEMA: engañosa con clases desbalanceadas. Ejemplo: 95% negativos→predecir siempre negativo=95% accuracy pero inútil. Usar con precaución. Mejor combinar con precision/recall."
                    },
                    {
                        acronym: "Precision",
                        name: "Precision",
                        definition: "De predicciones positivas, cuántas correctas: TP/(FP+TP). Pregunta: '¿Qué tan confiable cuando dice positivo?' Alta precision=pocos FP. Crítica cuando costo FP alto. Ejemplo: spam detection (marcar email legítimo como spam es costoso). Trade-off con recall."
                    },
                    {
                        acronym: "Recall",
                        name: "Recall / Sensitivity",
                        definition: "De casos realmente positivos, cuántos detecta: TP/(FN+TP). Pregunta: '¿Qué tan completa la detección?' Alto recall=pocos FN. Crítico cuando costo FN alto. Ejemplo: detección de cáncer (no detectar caso real es costoso). Trade-off con precision."
                    },
                    {
                        acronym: "F1",
                        name: "F1 Score",
                        definition: "Media armónica de precision y recall: F1=2TP/(FN+FP+2TP)=2·(precision·recall)/(precision+recall). Rango: [0,1], 1=perfecto. Solo alto cuando AMBAS altas. Ideal para clases desbalanceadas. Variantes: F2 (favorece recall), F0.5 (favorece precision)."
                    },
                    {
                        acronym: "TPR",
                        name: "True Positive Rate",
                        definition: "Equivalente a Recall: TP/(FN+TP). También 'power' o '1-FNR'. Proporción de positivos correctamente identificados. Eje Y en ROC. Pregunta: '¿Qué fracción de casos positivos capta?' Rango: [0,1], 1=detecta todos."
                    },
                    {
                        acronym: "FPR",
                        name: "False Positive Rate",
                        definition: "De negativos reales, cuántos marca como positivos: FP/(TN+FP)=1-TNR. También 'Type I error'. Eje X en ROC. Pregunta: '¿Qué fracción de negativos incorrectamente marcados?' Rango: [0,1], 0=no produce FP."
                    },
                    {
                        acronym: "TNR",
                        name: "True Negative Rate",
                        definition: "Especificidad: TN/(TN+FP)=1-FPR. Proporción de negativos correctamente identificados. Importante cuando identificar negativos correctamente es crítico. Ejemplo: screening médico, evitar alarmas falsas."
                    },
                    {
                        acronym: "FNR",
                        name: "False Negative Rate",
                        definition: "Type II error: FN/(FN+TP)=1-TPR. De positivos reales, cuántos no detecta. Crítico en aplicaciones seguridad/salud donde fallar en detectar positivo tiene consecuencias graves. Ejemplo: no detectar fraude, no detectar enfermedad."
                    },
                    {
                        acronym: "ROC",
                        name: "ROC Curve",
                        definition: "Grafica TPR vs FPR para todos umbrales posibles. Eje X: FPR, Eje Y: TPR. Cada punto=un umbral. Umbral bajo: todos predichos +, (FPR=1,TPR=1). Umbral alto: todos predichos -, (FPR=0,TPR=0). Evalúa discriminación independiente del umbral."
                    },
                    {
                        acronym: "AUC",
                        name: "Area Under ROC Curve",
                        definition: "AUC=∫₀¹TPR(FPR)dFPR∈[0,1]. Interpretación: probabilidad que modelo rankee ejemplo positivo aleatorio más alto que negativo aleatorio. AUC=0.5: aleatorio (diagonal). AUC=1.0: perfecto. Típicamente 0.5-1.0. AUC<0.5 indica predicciones invertidas."
                    }
                ]
                },
                {
                    subid: "1.3.3",
                    subtitle: "Bias Variance Trade-off",
                    description: "Equilibrio entre sesgo y varianza para entender el rendimiento y generalización del modelo.",
                    concepts: [
                    {
                        acronym: "Bias",
                        name: "Model Bias",
                        definition: "Diferencia entre predicción promedio del modelo y valor verdadero. Alto bias: modelo muy simple, no captura patrones (underfitting). Ejemplo: regresión lineal para datos no-lineales. Síntomas: error alto en train Y test. Solución: modelo más complejo, más features, menos regularización."
                    },
                    {
                        acronym: "Variance",
                        name: "Model Variance",
                        definition: "Cuánto cambiarían predicciones si entrenamos con diferentes datasets. Alta variance: modelo muy sensible a datos específicos (overfitting). Ejemplo: árbol muy profundo. Síntomas: error bajo en train, alto en test. Solución: más datos, regularización, ensemble, arquitectura más simple."
                    },
                    {
                        acronym: "Underfit",
                        name: "Underfitting",
                        definition: "Modelo muy simple para capturar patrones. Alto bias, bajo variance. Error alto en train Y test. Causas: (1) Modelo muy simple, (2) Features inadecuados, (3) Regularización excesiva. Soluciones: aumentar complejidad, añadir features, reducir regularización."
                    },
                    {
                        acronym: "Overfit",
                        name: "Overfitting",
                        definition: "Modelo memoriza training data en lugar de aprender patrones generales. Bajo bias, alta variance. Error muy bajo en train, alto en test (gap grande). Causas: (1) Modelo muy complejo, (2) Poco training data, (3) Ruido, (4) Entrenar demasiado. Soluciones: regularización, más datos, dropout, early stopping, data augmentation."
                    },
                    {
                        acronym: "B-V Tradeoff",
                        name: "Bias-Variance Tradeoff",
                        definition: "Error total=Bias²+Variance+Irreducible Error. Reducir bias típicamente aumenta variance y viceversa. Sweet spot: minimizar suma de ambos. Estrategia: (1) Empezar simple (alto bias), (2) Incrementar complejidad hasta variance aceptable, (3) Regularizar. DL moderno: enfoque en baja bias, controlando variance con regularización y muchos datos."
                    },
                    {
                        acronym: "Train-Test Gap",
                        name: "Train-Test Gap",
                        definition: "Diferencia entre error de train y test. Gap pequeño: generaliza bien (puede ser underfitting si ambos altos). Gap grande: overfitting claro. Objetivo: error bajo en AMBOS. Monitorear gap guía decisiones: si crece, añadir regularización; si ambos altos, aumentar capacidad."
                    }
                ]
                }
            ]
        }
    ]
};