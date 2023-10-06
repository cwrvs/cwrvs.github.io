<!DOCTYPE html>
<html>
<head>
    <title>Random Dice Generator</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <div id="container">
        <h1>Roll the Dice!</h1>
        <button id="rollButton">Roll</button>
        <div id="result" class="slot-machine">
            <span class="number">1</span>
            <span class="number">2</span>
            <span class="number">3</span>
            <span class="number">4</span>
            <span class="number">5</span>
            <span class="number">6</span>
            <span class="number">7</span>
            <span class="number">8</span>
            <span class="number">9</span>
            <span class="number">10</span>
            <span class="number">11</span>
            <span class="number">12</span>
        </div>
        <div id="rollCounter">
            <h2>Roll Counter</h2>
            <ul>
                <li><span class="roll-label">2:</span> <span id="rollCount2">0</span></li>
                <li><span class="roll-label">3:</span> <span id="rollCount3">0</span></li>
                <li><span class="roll-label">4:</span> <span id="rollCount4">0</span></li>
                <li><span class="roll-label">5:</span> <span id="rollCount5">0</span></li>
                <li><span class="roll-label">6:</span> <span id="rollCount6">0</span></li>
                <li><span class="roll-label">7:</span> <span id="rollCount7">0</span></li>
                <li><span class="roll-label">8:</span> <span id="rollCount8">0</span></li>
                <li><span class="roll-label">9:</span> <span id="rollCount9">0</span></li>
                <li><span class="roll-label">10:</span> <span id="rollCount10">0</span></li>
                <li><span class="roll-label">11:</span> <span id="rollCount11">0</span></li>
                <li><span class="roll-label">12:</span> <span id="rollCount12">0</span></li>
            </ul>
        </div>
        <div id="outcomeMessage"></div>
    </div>
    <script src="script.js"></script>
</body>
</html>
