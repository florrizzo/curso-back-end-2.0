![consigna1.png](https://github.com/florrizzo/curso-back-end-2.0/blob/master/Desafio14_LoggersGzipYAnalisisDePerformance/imagenesReadme/consigna1.png)

![consigna2.png](https://github.com/florrizzo/curso-back-end-2.0/blob/master/Desafio14_LoggersGzipYAnalisisDePerformance/imagenesReadme/consigna2.png)

![compresiongzip.jpg](https://github.com/florrizzo/curso-back-end-2.0/blob/master/Desafio14_LoggersGzipYAnalisisDePerformance/imagenesReadme/compresiongzip.jpg)

La cantidad de bytes transferidos sin compresión es de 682 B, y con compresión es de 537 B. Es decir, existe una diferencia de 145 B

![consigna3.png](https://github.com/florrizzo/curso-back-end-2.0/blob/master/Desafio14_LoggersGzipYAnalisisDePerformance/imagenesReadme/consigna3.png)

Ver los archivos warn.log e info.log

![consigna4.png](https://github.com/florrizzo/curso-back-end-2.0/blob/master/Desafio14_LoggersGzipYAnalisisDePerformance/imagenesReadme/consigna4.png)

Con los console.log de la ruta /info comentados, ejecutar los siguientes comandos:

node --prof server.js 8081 FORK
(En otra terminal)
artillery quick --count 50 -n 20 http://localhost:8081/info > artillery_sincl.txt
Apagar el servidor, cambiar el nombre del archivo "isolate..." a "prof_sincl.log" y ejecutar
node --prof-process sincl.log >prof_sincl.txt 

Con los console.log de la ruta /info descomentaos, repetir los comandos:

node --prof server.js 8081 FORK
(En otra terminal)
artillery quick --count 50 -n 20 http://localhost:8081/info > artillery_concl.txt
Apagar el servidor, cambiar el nombre del archivo "isolate..." a "prof_concl.log" y ejecutar
node --prof-process sincl.log >prof_concl.txt 

Ver la carpeta "analisisPerformance/--prof" para ver estos archivos.

![artillery.png](https://github.com/florrizzo/curso-back-end-2.0/blob/master/Desafio14_LoggersGzipYAnalisisDePerformance/imagenesReadme/artillery.png)


![--prof.png](https://github.com/florrizzo/curso-back-end-2.0/blob/master/Desafio14_LoggersGzipYAnalisisDePerformance/imagenesReadme/--prof.png)


![consigna5.png](https://github.com/florrizzo/curso-back-end-2.0/blob/master/Desafio14_LoggersGzipYAnalisisDePerformance/imagenesReadme/consigna5.png)


![consigna6.png](https://github.com/florrizzo/curso-back-end-2.0/blob/master/Desafio14_LoggersGzipYAnalisisDePerformance/imagenesReadme/consigna6.png)

![autocannonCMD.png](https://github.com/florrizzo/curso-back-end-2.0/blob/master/Desafio14_LoggersGzipYAnalisisDePerformance/imagenesReadme/autocannonCMD.png)

![autocannonConCL.png](https://github.com/florrizzo/curso-back-end-2.0/blob/master/Desafio14_LoggersGzipYAnalisisDePerformance/imagenesReadme/autocannonConCL.png)

![autocannonSinCL.png](https://github.com/florrizzo/curso-back-end-2.0/blob/master/Desafio14_LoggersGzipYAnalisisDePerformance/imagenesReadme/autocannonSinCL.png)
