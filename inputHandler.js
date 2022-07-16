//Inputs
const keys= {
    w:{
        pressed: false
    },
    a:{
        pressed:false
    },
    s:{
        pressed: false
    },
    d:{
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    },
    ArrowRight:{
        pressed: false
    },
    SpaceBar:{
        pressed: false
    },
    EscapeKey:{
        pressed: false
    }
}
window.addEventListener('keydown',(e)=> {
    //console.log(e.key)
    switch (e.key) {
        case 'w':
            keys.w.pressed=true
            break;
        case 'a':
            keys.a.pressed=true
            break;
        case 's':
            keys.s.pressed=true
            break;
        case 'd':
            keys.d.pressed=true
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed=true
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed=true;
            break;
        case ' ':
            keys.SpaceBar.pressed=true
            break;
        case 'Escape':
            keys.EscapeKey.pressed=true
            break;
    }
})
window.addEventListener('keyup',(e)=> {
    switch (e.key) {
        case 'w':
            keys.w.pressed=false
            break;
        case 'a':
            keys.a.pressed=false
            break;
        case 's':
            keys.s.pressed=false
            break;
        case 'd':
            keys.d.pressed=false
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed=false
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed=false;
            break;
        case ' ':
            keys.SpaceBar.pressed=false
            break;
        case 'Escape':
            keys.EscapeKey.pressed=false
            break;
    }
})
