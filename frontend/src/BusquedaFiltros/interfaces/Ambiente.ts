
export interface Periodo {
    id: number;
    id_ambiente: number;
    id_horario: number;
    estado: string;
    fecha: string;
    ambiente: {
      id:number,
      nombre:string,
      tipo:string,
      ubicacion:string,
      capacidad:number
    }
    horario:{
      id:number,
      dia:string,
      hora_inicio:string,
      hora_fin:string
    }
  }
