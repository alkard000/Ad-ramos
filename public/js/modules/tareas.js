import axios from "axios";
import Swal from 'sweetalert2';

const tareas = document.querySelector('.listado-pendientes');

if(tareas){

    tareas.addEventListener('click', e => {
        if(e.target.classList.contains('fa-check-circle')){
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;
            //request hacia el dir /tareas/:id
            const url = `${location.origin}/tareas/${idTarea}`;

            axios.patch(url, { idTarea })
                .then(function(respuesta){
                    if(respuesta.status === 200){
                        icono.classList.toggle('completo');
                    }
                })
        }
        if(e.target.classList.contains('fa-trash')) {
            const tareaHTML = e.target.parentElement.parentElement,
                    idTarea = tareaHTML.dataset.tarea;

                    Swal.fire({
                        title: 'Deseas Eliminar esta Tarea?',
                        text: "Si lo borras no volveras a recuperarlo",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Si, borrar!',
                        cancelButtonText : 'Cancelar'
                    }).then((result) => {
                        const url =  `${location.origin}/tareas/${idTarea}`;
                        if (result.value) {
                            //enviar el delete por AXIOS
                            axios.delete(url, { params : { idTarea } })
                                .then(function(respuesta){
                                    if(respuesta.status === 200) {
                                        //eliminar nodo
                                        tareaHTML.parentElement.removeChild(tareaHTML);

                                        Swal.fire(
                                            'Tarea Elminada',
                                            respuesta.data,
                                            'success'
                                        )
                                    }
                                });
                        }
                    })
        }
    });

}

export default tareas;