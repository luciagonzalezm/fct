import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Encuesta } from 'src/app/clases/encuesta';
import { Pregunta } from 'src/app/clases/pregunta';
import { CargaPollService } from 'src/app/servicios/carga-poll.service';
import { CargaQuestionService } from 'src/app/servicios/carga-question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
  public titulo: string = '';
  public descripcion: string = '';
  public idEncuesta: number = 1;
  public arrayPreguntas: Array<Pregunta> = [];
  public encuesta: Encuesta = new Encuesta(0,'','', []);
  public numPregunta: number = 1;
  public pregunta: Pregunta = new Pregunta(this.numPregunta, '', '', true, '', false, '', false);
  public preguntaModificar: Pregunta = new Pregunta(this.numPregunta, '', '', true, '', false, '', false);
  public preguntas: boolean = true;
  public encabezado: boolean = false;
  public modificar: boolean = false;

  constructor(private titleService: Title, private cargaQuestion: CargaQuestionService, private cargaPoll: CargaPollService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.titleService.setTitle('Crear una nueva encuesta');
  }

  crearTituloDescripcion(): void {
    this.titulo = this.titulo;
    this.descripcion = this.descripcion;
    this.encabezado = true;
    this.encuesta = new Encuesta(this.idEncuesta, this.titulo, this.descripcion, this.arrayPreguntas);
    let params = JSON.parse(JSON.stringify(this.encuesta));
    this.cargaPoll.postNewPoll(params).subscribe(
      encuestas => {
        console.log(encuestas);
      },
      error => console.log(error)
    );
  }

  crearNuevaPregunta(): void {
    this.arrayPreguntas[this.numPregunta - 1] = this.pregunta;
    let params1 = JSON.parse(JSON.stringify(this.pregunta));
    this.cargaQuestion.postNewQuestion(params1).subscribe(
      preguntas => {
        console.log(preguntas);
      },
      error => console.log(error)
    );
    let params2 = JSON.parse(JSON.stringify(this.encuesta));
    this.cargaPoll.modifyPollById(params2).subscribe(
      encuestas => {
        console.log(encuestas);
      },
      error => console.log(error)
    );
    this.pregunta = new Pregunta(this.numPregunta + 1, '', '', true, '', false, '', false);
    this.numPregunta++;
    this.preguntas = true;
    console.log(this.arrayPreguntas);
  }

  otraNuevaPregunta(): void {
    this.pregunta = new Pregunta(this.numPregunta + 1, '', '', true, '', false, '', false);
    this.numPregunta++;
    this.preguntas = true;
    console.log(this.arrayPreguntas);
  }

  finalizarEncuesta(): void {
    if (this.arrayPreguntas.length < 1) {
      Swal.fire({
        icon: 'error',
        title: 'Error al finalizar encuenta',
        text: 'No se puede crear una encuesta sin preguntas, por favor, introduzca al menos una pregunta',
      });
    } else {
      this.preguntas = false;
      this.numPregunta = this.numPregunta - 1;
    }
  }

  modificarPregunta(pregunta: Pregunta): void {
    this.modificar = true;
    this.pregunta = pregunta;
    this.cargaQuestion.getQuestionById(pregunta.id).subscribe(
      pregunta => {
        this.pregunta = pregunta
        console.log(this.pregunta);
      },
      error => console.log(error)
    );
  }

  modificarPreguntaPorId(): void {
    let indice = this.arrayPreguntas.indexOf(this.pregunta);
    let params1 = JSON.parse(JSON.stringify(this.pregunta));
    this.cargaQuestion.modifyQuestionById(params1).subscribe(
      pregunta => {
        console.log(pregunta);
        this.arrayPreguntas.splice(indice, 1, pregunta);
        let params2 = JSON.parse(JSON.stringify(this.encuesta));
        this.cargaPoll.modifyPollById(params2).subscribe(
          encuestas => {
            console.log(encuestas);
          },
          error => console.log(error)
        );
        this.modificar = false;
      }
    );
  }

  crearNuevaEncuesta(): void {
    this.idEncuesta++;
    this.encuesta = new Encuesta(this.idEncuesta, this.titulo, this.descripcion, this.arrayPreguntas);
    let params = JSON.parse(JSON.stringify(this.encuesta));
    this.cargaPoll.modifyPollById(params).subscribe(
      encuestas => {
        console.log(encuestas);
        this.arrayPreguntas.forEach(pregunta => {
          this.cargaQuestion.deleteQuestionById(pregunta.id).subscribe(
            preguntas => {
              console.log(preguntas);
              this.router.navigate(['/supervisores/encuestas/mostrar']);
            },
            error => console.log(error)
          );
        });
      },
      error => console.log(error)
    );
    console.log(this.encuesta);
  }

  eliminarPreguntaPorId(preguntaId: number, pregunta: Pregunta): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'La pregunta se eliminará permanentemente',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cargaQuestion.deleteQuestionById(preguntaId).subscribe(
          preguntas => {
            console.log('Pregunta ' + (preguntaId) + ' eliminada');
            this.arrayPreguntas.splice(this.arrayPreguntas.indexOf(pregunta), 1);
            this.numPregunta = this.numPregunta - 1;
            let params = JSON.parse(JSON.stringify(this.encuesta));
            this.cargaPoll.modifyPollById(params).subscribe(
              encuestas => {
                console.log(encuestas);
              },
              error => console.log(error)
            );
            console.log(preguntas);
          },
          error => console.log(error)
        );

        Swal.fire('Pregunta borrada', 'La pregunta ha sido borrada correctamente', 'success');
      } else {
        Swal.fire('Operación cancelada', 'La pregunta no ha sido borrada');
      }
    });
  }

}
