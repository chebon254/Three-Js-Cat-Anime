document.addEventListener("DOMContentLoaded", function () {
    BABYLON.Engine.ShadersRepository = "/shaders/";

    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);

    var scene = new BABYLON.Scene(engine);

    // Load the 3D model
    BABYLON.SceneLoader.Append("", "cat.gltf", scene, function () {
        // Model loaded callback (if needed)
        // Find the root node or container mesh of the cat model
        var catContainer = scene.meshes.find(mesh => mesh.name === "RootNode" || mesh.name === "ContainerMesh");

        // Move the cat down by adjusting its position
        catContainer.position.y -= -40; // Adjust the value as needed
    });

    // Create a camera
    var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 10, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // Set the engine to use the full size of the canvas
    engine.setSize(window.innerWidth, window.innerHeight);

    // Create a light
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Start the engine
    engine.runRenderLoop(function () {
        scene.render();
    });

    // Resize the canvas on window resize
    window.addEventListener("resize", function () {
        engine.setSize(window.innerWidth, window.innerHeight);
    });
});