var width = 400;
var height = 400;
var renderer,scene,camera 

document.addEventListener("DOMContentLoaded",function(){
    setup();
    draw();
})

function setup(){
    //  canvas = document.createElement('canvas');
    //  ctx = canvas.getContext('2d');

    //  canvas.setAttribute("width",width);
    //  canvas.setAttribute("height",height);

    //  document.getElementsByTagName('body')[0].appendChild(canvas);


    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // var geometry = new THREE.Geometry();
    var geometry = new THREE.BufferGeometry();

    // geometry.vertices.push(
    //     new THREE.Vector3( -1,  1, 0 ),
    //     new THREE.Vector3( -1, -1, 0 ),
    //     new THREE.Vector3(  1, -1, 0 ),
        
    // );

    // geometry.vertices.push(
    //     new THREE.Vector3( 1,  1, 0 ),
    //     new THREE.Vector3( 1, -1, 0 ),
    //     new THREE.Vector3( -1, 1, 0 )
    // );

    // geometry.vertices.push( new THREE.Vector3( 0, 0, 0 ),
    //     new THREE.Vector3( 0, 1, 0 ),
    //     new THREE.Vector3( 0, 1, 1 ),
    //     new THREE.Vector3( 0, 0, 1 )
    //     );

    var scl = 3
    var cols = 40
    var rows = 20
    var positions = new Float32Array( cols*rows*2 +4); // 4 triangles, 3 vertices each
    positions[0] = rows*scl-scl;
    positions[1] = 0;
    for(var y=0;y<cols;y++){
        for(var x=0;x<rows;x++){
            positions[x*4+y*4*rows+2]   = x*scl;
            positions[x*4+y*4*rows+3] = -y*scl;
            positions[x*4+y*4*rows+4] = x*scl;
            positions[x*4+y*4*rows+5] = -(y+1)*scl;
        }
    }
  


    geometry.computeBoundingSphere();
    geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 2) );



   mesh = new THREE.Object3D(); 
   var material = new THREE.LineBasicMaterial({
                        color: 0xffffff,
                        linewidth: 2
                        // transparent: true
                    });
   var phongMeterial = new THREE.MeshPhongMaterial( {
					color: 0x156289,
					emissive: 0x072534,
					side: THREE.DoubleSide,
					shading: THREE.FlatShading,
                    transparent: true
				});
    object = new THREE.Mesh( geometry,phongMeterial);
    object.drawMode = THREE.TriangleStripDrawMode;
    object.setDrawMode( THREE.TriangleStripDrawMode );

    line  = new THREE.Line( geometry, material );

    mesh.add(object);
    mesh.add(line);
    // line.position.z = 1;
    // var cube = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    // var mesh = new THREE.Mesh( geometry,material );
    // mesh.setDrawMode( THREE.TriangleStripDrawMode );
    // scene.add( mesh );
    // geometry.attributes.position.needsUpdate = true;

    camera.position.z = 60;
    mesh.rotateX(-Math.PI/4);
    // camera.position.x = 10;

}

function draw(){
    mesh.rotateZ(-Math.PI/400);
	renderer.render( scene, camera );
    requestAnimationFrame( draw );
}

