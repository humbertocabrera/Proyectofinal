let nav = 0; //Variable que verifica que no hemos cambiado de mes
let clicked = null;

const calendario = document.getElementById('calendario');
const semana = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const backDrop = document.getElementById('modalBackDrop');

//BOTONES

const botonMesSig = document.getElementById('MesSig')
const botonMesPrev = document.getElementById('MesPrev')
const botonMenu = document.getElementById('ayuda');
const contenidoMenu = document.getElementById('modal-container');
const botonCierreMenu = document.getElementById('CerrarModal');
const contenidoEvento = document.getElementById('Evento-modal-container');
const botonCierreEvento = document.getElementById('CerrarEventoModal');

function Eventos(titulo, fecha, codigo, descripcion){
    this.titulo = titulo;
    this.fecha = fecha;
    this.codigo = codigo;
    this.descripcion = descripcion;
}

let arrayEventos = [];

let evento01 = new Eventos("Festival", "4/30/2021", "familiar", "Festival del dia del niño en el parque Fray Andres de Olmos, de 2pm - 6pm. ¡Comida, premios y mucha Diversión!");
let evento02 = new Eventos("Partido", "5/30/2021", "deportivo", "¡Este domingo a las 7 pm nos jugamos el pase a la liguilla! ¡Acompaña a la Jaiba Brava! Tampico vs Atlante");
let evento03 = new Eventos("Desfile", "5/5/2021", "cultural", "Presencia el desfile dedicado a nuestro heroes que pelearon la batalla de Puebla, en la Plaza de Armas"+"\nHora de Inicio: 6:00 pm");
let evento04 = new Eventos("Concierto", "10/3/2021", "social", "¡Presencia en vivo a SafetySuit este domingo en concierto, en la Expo!"+"\nBoletos en TicketMaster"+"\nHora de Inicio: 7:00 pm");


arrayEventos.push(evento01, evento02, evento03, evento04);


function AbrirEvento(RevisaDias){
    const DiaEvento = arrayEventos.find(e => e.fecha === RevisaDias);
    if (DiaEvento){
        document.getElementById('espacioEvento').innerText = DiaEvento.descripcion;
        contenidoEvento.classList.add('mostrar');
    }
}

function Calendario(){
    const FechaActual = new Date();
    
    if(nav !== 0){
        FechaActual.setMonth(new Date().getMonth() + nav); //Se altera el parametro de mes de la fecha actual, con respecto al numero de clicks en las flechas
    }
    
    const day = FechaActual.getDate();
    const month = FechaActual.getMonth();                       //Guarda en valores separados la fecha
    const year = FechaActual.getFullYear();

    //console.log(day);

    const PrimerDiaMes = new Date(year, month, 1); 
    const DiasTotalesMes = new Date(year, month + 1, 0).getDate(); //Como no hay dia 0, se regresa al ultimo dia del mes anterior
    
    
    //Guardamos en un string la fecha actual, con el día de la semana del primer dia del mes
    const StringFecha = PrimerDiaMes.toLocaleDateString('en-us', { 
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day:'numeric',
    });
    
    const DiasMesAntes = semana.indexOf(StringFecha.split(', ')[0]); //Separamos el string de la fecha, para quedarnos solo con el indice del dia de la semana

    //Se cambia el mes y el año en la cabecera del calendario, al dar en las flechas
    document.getElementById('CambioDeMes').innerText = `${FechaActual.toLocaleDateString('es-mx', {month:'long'})} ${year}`; 
    //console.log(`${FechaActual.toLocaleDateString('es-mx', {month:'long'})} ${year}`); 

    calendario.innerHTML = "";
    
    //Ciclo for que recorre y va agregando los cuadros de días en el calendario
    for(let i = 1; i <= DiasMesAntes + DiasTotalesMes; i++){
        const Recuadro = document.createElement('div');
        Recuadro.classList.add('day');
        
        let RevisaDias = `${month+1}/${i-DiasMesAntes}/${year}`
        //console.log(RevisaDias);
        
        //If que revisa desde que cuadro empezar a poner los numeros de los días
        if (i > DiasMesAntes){
            Recuadro.innerText = i - DiasMesAntes;
            const DiaEvento = arrayEventos.find(e => e.fecha === RevisaDias);
            

            if((i - DiasMesAntes) === day && nav === 0){
                Recuadro.id = 'DiaActual';
            }
            
            if(DiaEvento){
                const EventoDiv = document.createElement('div');
                if (DiaEvento.codigo === "deportivo"){
                    EventoDiv.classList.add('evento_deportivo');
                }else if (DiaEvento.codigo === "familiar"){
                    EventoDiv.classList.add('evento_familiar');
                }else if(DiaEvento.codigo === "social"){
                    EventoDiv.classList.add('evento_social');
                }else{
                    EventoDiv.classList.add('evento_cultural');
                }
                
                EventoDiv.innerText = "Evento";
                Recuadro.appendChild(EventoDiv);
            }

            Recuadro.addEventListener('click', ()=> AbrirEvento(RevisaDias));
        }else{
            Recuadro.classList.add('DiasMesPrev');
        }

        calendario.appendChild(Recuadro);
    }
}


function botones(){
    botonMesSig.addEventListener('click', ()=>{
        nav++;
        Calendario();
    });

    botonMesPrev.addEventListener('click', ()=>{
        nav--;
        Calendario();
    });

    botonMenu.addEventListener('click', ()=> {
        contenidoMenu.classList.add('mostrar');
    });

    botonCierreMenu.addEventListener('click', ()=> {
        contenidoMenu.classList.remove('mostrar');
    });

    botonCierreEvento.addEventListener('click', ()=> {
        contenidoEvento.classList.remove('mostrar');
    });
}


botones();
Calendario();
