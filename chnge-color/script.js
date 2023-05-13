
  var color = ["red", "pink", "green", "cyan", "orange", "gray", "yellow"];
  var cur = 0;
  var cShape = 0;

  console.log("ssss");



  function chngeColor() {
    console.log("color");

    if (cur == color.length)
      cur = 0;
    out.style.backgroundColor = `${color[cur]}`;
    cur++;

        // out.style.backgroundColor = "red";

  }

  function chngeShape() {
    if (cShape > 5)
      cShape = 0;

    ++cShape;
    inner.className = '';
    switch (cShape) {
      case 1:
        inner.classList.add("triangle-up");
        break;
      case 2:
        inner.classList.add("triangle-right");
        break;
      case 3:
        inner.classList.add("triangle-down");
        break;
      case 4:
        inner.classList.add("triangle-left");
        break;
      case 5:
        inner.classList.add("square");
        break;
    }
  }

  var col = document.getElementById('color');
  var shape = document.getElementById('shape');
  
  var outer = document.getElementById('out');
  var inner = document.getElementById('in');


  col.addEventListener('click', chngeColor);
  shape.addEventListener('click', chngeShape);
