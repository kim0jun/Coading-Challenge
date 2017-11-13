var width = 400;
var height = 400;
var renderer,scene,camera 

document.addEventListener("DOMContentLoaded",function(){
    setup();
    draw();
})

function setup(){
    scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 50 );
			camera.position.z = 30;

			renderer = new THREE.WebGLRenderer( { antialias: true } );
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( window.innerWidth, window.innerHeight );
			renderer.setClearColor( 0x000000, 1 );
			document.body.appendChild( renderer.domElement );

			// var orbit = new THREE.OrbitControls( camera, renderer.domElement );
			// orbit.enableZoom = false;

			var lights = [];
			lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
			lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
			lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

			lights[ 0 ].position.set( 0, 200, 0 );
			lights[ 1 ].position.set( 100, 200, 100 );
			lights[ 2 ].position.set( - 100, - 200, - 100 );

			scene.add( lights[ 0 ] );
			scene.add( lights[ 1 ] );
			scene.add( lights[ 2 ] );

			var mesh = new THREE.Object3D();

			mesh.add( new THREE.LineSegments(

				new THREE.Geometry(),

				new THREE.LineBasicMaterial( {
					color: 0xffffff,
					transparent: true,
					opacity: 0.5
				} )

			) );

			mesh.add( new THREE.Mesh(

				new THREE.Geometry(),

				new THREE.MeshPhongMaterial( {
					color: 0x156289,
					emissive: 0x072534,
					side: THREE.DoubleSide,
					shading: THREE.FlatShading
				} )

			) );


            // scene.add( mesh );
			// var options = chooseFromHash( mesh );



            var geometry = new THREE.SphereGeometry(40, 50, 30);
            var material = new THREE.MeshBasicMaterial({
                color: 0xF3A2B0,
                wireframe: false
            });
            var material2 = new THREE.MeshBasicMaterial({
                color: 0xfffff
            });
            
            
            cube =  new THREE.Object3D();
            line = new THREE.LineSegments(geometry, new THREE.LineBasicMaterial( {
					color: 0xffffff,
					transparent: true,
					opacity: 0.5
            }))
            cube.add(new THREE.Mesh(geometry,new THREE.MeshPhongMaterial( {
					color: 0x156289,
					emissive: 0x072534,
					side: THREE.DoubleSide,
					shading: THREE.FlatShading
				})));
            cube.add(line);
            cube.position.z = -40
            console.log(cube.rotaionY)
            scene.add(cube);



			

			// var prevFog = false;
    
}

function draw(){
    cube.rotateY(Math.PI/240)
    cube.rotateX(Math.PI/240)
	renderer.render( scene, camera );
    requestAnimationFrame( draw );
}



