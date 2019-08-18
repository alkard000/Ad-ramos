import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if(btnEliminar){
    btnEliminar.addEventListener( 'click', e => {
        const urlProyecto = e.target.dataset.proyectoUrl;
        //console.log(urlProyecto);
        Swal.fire({
            title: 'Deseas Eliminar esta Asignatura?',
            text: "Si lo borras no volveras a recuperarlo",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!',
            cancelButtonText : 'Cancelar'
          }).then((result) => {
            if (result.value) {
                //enviar la peticion a AXIOS
                const url = `${location.origin}/proyectos/${urlProyecto}`;
                axios.delete(url, { params : {urlProyecto} })
                    .then(function(respuesta){
                        console.log(respuesta);
                        Swal.fire(
                            'Asignatura Eliminada',
                            respuesta.data,
                            'success'
                        );
                        setTimeout(() => {
                            window.location.href = '/'
                        }, 3000);
                    })
                    .catch(() => {
                        Swal.fire({
                            type : 'error',
                            title : 'Hubo un Error Inesperado',
                            text : 'No se puedo eliminaar La Asignatura'
                        })
                    })
            }
          })
    } )
}
export default btnEliminar;
