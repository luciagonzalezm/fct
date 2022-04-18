import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Encuesta } from 'src/app/clases/encuesta';
import { CargaPollService } from 'src/app/servicios/carga-poll.service';

@Component({
  selector: 'app-visualizar-encuestas',
  templateUrl: './visualizar-encuestas.component.html',
  styleUrls: ['./visualizar-encuestas.component.css']
})
export class VisualizarEncuestasComponent implements OnInit {
  public arrayEncuestas: Array<Encuesta> = [];
  public encuesta: Encuesta = new Encuesta(0, '', '', []);
  public detalles: boolean = false;

  constructor(private titleService: Title, private cargaPoll: CargaPollService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Visualizar encuestas');
    this.cargaPoll.getPolls().subscribe(
      encuestas => {
        this.arrayEncuestas = encuestas;
        console.log(this.arrayEncuestas);
      },
      error => console.log(error)
    );
  }

  mostrarDetalles(encuesta: Encuesta): void {
    this.detalles = true;
    this.cargaPoll.getPollById(encuesta.id).subscribe(
      encuesta => {
        this.encuesta = encuesta;
        console.log(this.encuesta);
      },
      error => console.log(error)
    );
  }

}
