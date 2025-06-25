class CalculadoraBasica extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
         <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
      <style>
        * {
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        .card {
          text-align: center;
          background:rgb(233, 191, 205);
          border-radius: 20px;
          border: 1px solid #e1bee7;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 520px;
        }

        h4 {
          color:rgb(66, 62, 68);
          font-weight: 600;
        }

        .form-control,
        .form-select {
          height: 100px;
          width: 500px;
          font-size: 1.1rem;
          background-color: rgb(233, 191, 205);
          border: 1px solid #f8bbd0;
          color:rgb(66, 62, 68);
        }

        .form-control::placeholder {
          color: rgb(66, 62, 68);
        }

        .btn-primary {
          background-color:rgb(179, 142, 185);
          border-color: rgb(179, 142, 185);
          font-size: 1.1rem;
          border-radius: 10px;
          height: 50px;
        }

        .btn-primary:hover {
          background-color: rgb(179, 142, 185);
          border-color: ;
        }

        #resultado {
          color:rgb(63, 66, 66);
          font-size: 1.2rem;
        }

        #error {
          color:rgb(175, 101, 101);
        }
        
        #historial {
          margin-top: 20px;
          text-align: left;
          font-size: 25px;
          color: rgb(66, 62, 68);
        }

        #historial ul {
          list-style: none;
          padding-left: 0;
        }

        #historial li {
          background: #f3e5f5;
          margin-bottom: 5px;
          padding: 8px;
          border-radius: 8px;
          font-size: 1.1rem;
          color: #4a148c;
        }
      </style>
      
      <div class="card shadow p-4" style="max-width: 400px;">
        <h4 class="mb-3 text-center">Calculadora Básica</h4>
        <div class="mb-3">
          <input type="number" id="num1" class="form-control" placeholder="Número 1">
        </div>
        <div class="mb-3">
          <input type="number" id="num2" class="form-control" placeholder="Número 2">
        </div>
        <div class="mb-3">
          <select id="operacion" class="form-select">
            <option value="suma">Suma</option>
            <option value="resta">Resta</option>
            <option value="multiplicacion">Multiplicación</option>
            <option value="division">División</option>
          </select>
        </div>
        <div class="d-grid gap-2">
          <button id="calcular" class="btn btn-primary">Calcular</button>
        </div>
        <div id="resultado" class="mt-3 fw-bold text-center text-success"></div>
        <div id="error" class="mt-2 text-danger text-center"></div>
        
        <!-- Historial -->
        <div id="historial">
          <h6>Historial de operaciones:</h6>
          <ul id="lista-historial"></ul>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    this.shadowRoot.querySelector('#calcular').addEventListener('click', () => this.realizarCalculo());
  }

  realizarCalculo() {
    const num1 = parseFloat(this.shadowRoot.querySelector('#num1').value);
    const num2 = parseFloat(this.shadowRoot.querySelector('#num2').value);
    const operacion = this.shadowRoot.querySelector('#operacion').value;
    const resultadoEl = this.shadowRoot.querySelector('#resultado');
    const errorEl = this.shadowRoot.querySelector('#error');

    resultadoEl.textContent = '';
    errorEl.textContent = '';

    if (isNaN(num1) || isNaN(num2)) {
      errorEl.textContent = 'Por favor, ingresa ambos números válidos.';
      return;
    }

    let resultado;
    switch (operacion) {
      case 'suma':
        resultado = num1 + num2;
        break;
      case 'resta':
        resultado = num1 - num2;
        break;
      case 'multiplicacion':
        resultado = num1 * num2;
        break;
      case 'division':
        if (num2 === 0) {
          errorEl.textContent = 'Error: División por cero.';
          return;
        }
        resultado = num1 / num2;
        break;
    }

    resultadoEl.textContent = `Resultado: ${resultado}`;

    this.dispatchEvent(new CustomEvent('resultado-calculado', {
      detail: { resultado },
      bubbles: true,
      composed: true
    }));

    const operacionTexto = `${num1} ${signo} ${num2} = ${resultado}`;
    this.historial.push(operacionTexto);

    historialEl.innerHTML = '';
    this.historial.slice().reverse().forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      historialEl.appendChild(li);
    });
  }
}

customElements.define('calculadora-basica', CalculadoraBasica);


