//import { Input } from './Input.js';
import { Obj3D } from './Obj3D.js';
//import { Canvas3D } from './Canvas3D.js';
//import { CvWireframe } from './CvWireFrame.js';
import { CvHLines } from './CvHLines.js';
import { Rota3D } from './Rota3D.js';
var canvas;
var graphics;
canvas = document.getElementById('circlechart');
graphics = canvas.getContext('2d');
var cv;
var obj;
var ang = 0;
function leerArchivo(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    var lector = new FileReader();
    lector.onload = function (e) {
        var contenido = e.target.result;
        mostrarContenido(contenido);
        obj = new Obj3D();
        if (obj.read(contenido)) {
            //sDir = sDir1;
            cv = new CvHLines(graphics, canvas);
            cv.setObj(obj);
            cv.paint();
        }
    };
    lector.readAsText(archivo);
}
function mostrarContenido(contenido) {
    var elemento = document.getElementById('contenido-archivo');
    //
    //readObject(new Input(contenido));
    elemento.innerHTML = contenido;
}
function vp(dTheta, dPhi, fRho) {
    if (obj != undefined) {
        var obj_1 = cv.getObj();
        if (!obj_1.vp(cv, dTheta, dPhi, fRho))
            alert('datos no validos');
    }
    else
        alert('aun no has leido un archivo');
}
function eyeDownFunc() {
    vp(0, 0.1, 1);
}
function eyeUpFunc() {
    vp(0, -0.1, 1);
}
function eyeLeftFunc() {
    vp(-0.1, 0, 1);
}
function eyeRightFunc() {
    vp(0.1, 0, 1);
}
function incrDistFunc() {
    vp(0, 0, 2);
}
function decrDistFunc() {
    vp(0, 0, 0.5);
}
/* function pza1DerFunc() {
  let af = 10;
    
    Rota3D.initRotate( obj.w[139], obj.w[140], af*Math.PI/180);
    
  for (let i = 201; i <= 238; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
    }
    cv.setObj(obj);
  cv.paint();
}

function pza1IzqFunc() {
  let af = -10;
    
    Rota3D.initRotate( obj.w[139], obj.w[140], af*Math.PI/180);
    
  for (let i = 201; i <= 238; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
    }
    cv.setObj(obj);
  cv.paint();
}
function pza12DerFunc() {
  let af = 10;
  console.log(obj.w[29], obj.w[30], obj.w[6]);
  Rota3D.initRotate(obj.w[29], obj.w[30], af * Math.PI / 180);
    
  for (let i = 101; i <= 140; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
  }
  for (let i = 201; i <= 238; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
    }
    cv.setObj(obj);
  cv.paint();
}

function pza12IzqFunc() {
  let af = -10;
  console.log(obj.w[29], obj.w[30]);
    Rota3D.initRotate( obj.w[29], obj.w[30], af*Math.PI/180);
    
  for (let i = 101; i <= 140; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
    }
  for (let i = 201; i <= 238; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
    }
  
    cv.setObj(obj);
  cv.paint();
}

function Patitafunc(){
 let af = 20;
 Rota3D.initRotate( obj.w[101], obj.w[102], af*Math.PI/180);
  for(let i =1 ; i <= 8; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
  }

  cv.setObj(obj);
  cv.paint();
} */
var anima;
var audio = document.getElementById("Desenvainar");
var audio2 = document.getElementById("efectoBallesta");
function girar(angulo, ancla1, ancla2, inicio, final) {
    Rota3D.initRotate(obj.w[ancla1], obj.w[ancla2], angulo * Math.PI / 180);
    for (var i = inicio; i <= final; i++) {
        obj.w[i] = Rota3D.rotate(obj.w[i]);
    }
}
function metHoja() {
    for (var i = 1; i <= 6; i++) {
        if (obj.w[1].x <= -1) {
            obj.w[i].x = obj.w[i].x + 0.5;
        }
        else {
            clearInterval(anima);
        }
    }
    if (obj.w[1].x <= 1.5) {
        girar(-1, 1200, 1201, 141, 144);
        girar(1, 1200, 1201, 145, 148);
        girar(-1, 1202, 1203, 149, 152);
        girar(1, 1202, 1203, 153, 156);
    }
    else {
        clearInterval(anima);
    }
    if (obj.w[1].x <= 0.5) {
        for (var i = 149; i <= 156; i++) {
            obj.w[i].x = obj.w[i].x + 0.01;
        }
    }
    cv.setObj(obj);
    cv.paint();
}
function sacHoja() {
    for (var i = 1; i <= 6; i++) {
        if (obj.w[1].x >= -5) {
            obj.w[i].x = obj.w[i].x - 0.5;
        }
        else {
            clearInterval(anima);
        }
    }
    if (obj.w[1].x <= 1.5) {
        girar(1, 1200, 1201, 141, 144);
        girar(-1, 1200, 1201, 145, 148);
        girar(1, 1202, 1203, 149, 152);
        girar(-1, 1202, 1203, 153, 156);
    }
    else {
        clearInterval(anima);
    }
    if (obj.w[1].x <= 0.5) {
        for (var i = 149; i <= 156; i++) {
            obj.w[i].x = obj.w[i].x - 0.01;
        }
    }
    cv.setObj(obj);
    cv.paint();
}
function saveBallesta() {
    if (obj.w[207].z >= 1.7) {
        girar(-10, 1208, 1209, 205, 210);
        girar(10, 1210, 1211, 211, 216);
    }
    else {
        clearInterval(anima);
    }
    cv.setObj(obj);
    cv.paint();
}
function desplagarBallesta() {
    if (obj.w[207].z <= 2.1) {
        girar(10, 1208, 1209, 205, 210);
        girar(-10, 1210, 1211, 211, 216);
    }
    else {
        clearInterval(anima);
    }
    cv.setObj(obj);
    cv.paint();
}
function abirBrazalete() {
    if (obj.w[14].y <= 1.35) {
        girar(3, 1204, 1205, 14, 14);
        girar(3, 1204, 1205, 46, 46);
        girar(3, 1204, 1205, 185, 185);
        girar(3, 1204, 1205, 157, 157);
        girar(3, 1204, 1205, 22, 22);
        girar(3, 1204, 1205, 158, 158);
        girar(3, 1204, 1205, 54, 54);
        girar(3, 1204, 1205, 186, 186);
        girar(-3, 1206, 1207, 183, 183);
        girar(-3, 1206, 1207, 15, 15);
        girar(-3, 1206, 1207, 187, 187);
        girar(-3, 1206, 1207, 47, 47);
        girar(-3, 1206, 1207, 184, 184);
        girar(-3, 1206, 1207, 23, 23);
        girar(-3, 1206, 1207, 188, 188);
        girar(-3, 1206, 1207, 55, 55);
    }
    else {
        clearInterval(anima);
    }
    cv.setObj(obj);
    cv.paint();
}
function cerrarBrazalete() {
    if (obj.w[14].y >= 1) {
        girar(-3, 1204, 1205, 14, 14);
        girar(-3, 1204, 1205, 46, 46);
        girar(-3, 1204, 1205, 185, 185);
        girar(-3, 1204, 1205, 157, 157);
        girar(-3, 1204, 1205, 22, 22);
        girar(-3, 1204, 1205, 158, 158);
        girar(-3, 1204, 1205, 54, 54);
        girar(-3, 1204, 1205, 186, 186);
        girar(3, 1206, 1207, 183, 183);
        girar(3, 1206, 1207, 15, 15);
        girar(3, 1206, 1207, 187, 187);
        girar(3, 1206, 1207, 47, 47);
        girar(3, 1206, 1207, 184, 184);
        girar(3, 1206, 1207, 23, 23);
        girar(3, 1206, 1207, 188, 188);
        girar(3, 1206, 1207, 55, 55);
    }
    else {
        clearInterval(anima);
    }
    cv.setObj(obj);
    cv.paint();
}
function intHoja() {
    metHoja();
}
function outHoja() {
    sacHoja();
}
function svBallesta() {
    saveBallesta();
}
function despBallesta() {
    desplagarBallesta();
}
function openBrazalete() {
    abirBrazalete();
}
function closeBrazalete() {
    cerrarBrazalete();
}
function meterHoja() {
    anima = setInterval(intHoja, 25);
    audio.play();
}
function sacarHoja() {
    audio.play();
    anima = setInterval(outHoja, 25);
}
function gBallesta() {
    audio2.play();
    anima = setInterval(svBallesta, 25);
}
function outBallesta() {
    audio2.play();
    anima = setInterval(despBallesta, 25);
}
function Abrir() {
    anima = setInterval(openBrazalete, 25);
}
function Cerrar() {
    anima = setInterval(closeBrazalete, 25);
}
document.getElementById('file-input').addEventListener('change', leerArchivo, false);
document.getElementById('eyeDown').addEventListener('click', eyeDownFunc, false);
document.getElementById('eyeUp').addEventListener('click', eyeUpFunc, false);
document.getElementById('eyeLeft').addEventListener('click', eyeLeftFunc, false);
document.getElementById('eyeRight').addEventListener('click', eyeRightFunc, false);
document.getElementById('incrDist').addEventListener('click', incrDistFunc, false);
document.getElementById('decrDist').addEventListener('click', decrDistFunc, false);
//movimiento de piezas
/* document.getElementById('pza1Izq').addEventListener('click', pza1IzqFunc, false);
document.getElementById('pza1Der').addEventListener('click', pza1DerFunc, false);
document.getElementById('pza12Izq').addEventListener('click', pza12IzqFunc, false);
document.getElementById('pza12Der').addEventListener('click', pza12DerFunc, false);
document.getElementById('Patita').addEventListener('click', Patitafunc, false); */
document.getElementById('Cerrar').addEventListener('click', Cerrar, false);
document.getElementById('Abrir').addEventListener('click', Abrir, false);
document.getElementById('Desplegar-Ballesta').addEventListener('click', outBallesta, false);
document.getElementById('Guardar-Ballesta').addEventListener('click', gBallesta, false);
document.getElementById('Sacar-Hoja').addEventListener('click', sacarHoja, false);
document.getElementById('Meter-Hoja').addEventListener('click', meterHoja, false);
var Pix, Piy;
var Pfx, Pfy;
var theta = 0.3, phi = 1.3, SensibilidadX = 0.02, SensibilidadY = 0.02;
var flag = false;
function handleMouse(evento) {
    Pix = evento.offsetX;
    Piy = evento.offsetY;
    flag = true;
}
function makeVizualization(evento) {
    if (flag) {
        Pfx = evento.offsetX;
        Pfy = evento.offsetY;
        //console.log(Pfx, Pfy)
        var difX = Pix - Pfx;
        var difY = Pfy - Piy;
        vp(0, 0.1 * difY / 50, 1);
        Piy = Pfy;
        vp(0.1 * difX, 0 / 50, 1);
        Pix = Pfx;
        /*if( Piy>Pfy+1 ){
          phi += SensibilidadY;
          vp(0, 0.1*, 1);
          //cv.redibuja(theta, phi, tamanoObjeto);
          Piy=Pfy;
        }
    
        if(Pfy>Piy+1){
          phi -= SensibilidadY;
          vp(0,-0.1, 1);
          //cv.redibuja(theta, phi, tamanoObjeto);
          Piy=Pfy;
        }*/
        /*if (Pix > Pfx + 1) {
          theta += SensibilidadX;
          vp(0.1, 0, 1);
          //cv.redibuja(theta, phi, tamanoObjeto);
          Pix = Pfx;
        }
            
        if (Pfx > Pix + 1) {
          theta -= SensibilidadX;
          vp(-0.1, 0, 1);
          //cv.redibuja(theta, phi, tamanoObjeto);
          Pix = Pfx;
        }*/
    }
}
function noDraw() {
    flag = false;
}
canvas.addEventListener('mousedown', handleMouse);
canvas.addEventListener('mouseup', noDraw);
canvas.addEventListener('mousemove', makeVizualization);
