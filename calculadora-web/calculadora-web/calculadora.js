class CalculadoraBasica extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
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
  }
}

customElements.define('calculadora-basica', CalculadoraBasica);

this.dispatchEvent(new CustomEvent('resultado-calculado', {
  detail: { resultado },
  bubbles: true,
  composed: true
}));


