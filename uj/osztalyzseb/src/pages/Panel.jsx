

function Panel() {

    return (
        <div id="appContent" >
            <label htmlFor="name">Név:</label>
            <input type="text" id="name"/>

            <label htmlFor="balance">Egyenleg:</label>
            <input type="text" id="balance"/>

            <button >Tanuló hozzáadása</button>
            <button >Tanuló törlése</button>
            <button >Tanulók mentése</button>
            <button >Tanulók betöltése</button>

            <p id="totalBalance">Összes egyenleg: 0</p>

            <select id="studentsList" size="15"></select>

            <label htmlFor="moneyAction">Összeg:</label>
            <input type="text" id="moneyAction" />

            <button >Pénz kivonása</button>
            <button >Pénz hozzáadása</button>
            <button >Pénz kivonása mindenkitől</button>
            <button >Pénz hozzáadása mindenkihez</button>
        </div>
      
    )
}
  
export default Panel