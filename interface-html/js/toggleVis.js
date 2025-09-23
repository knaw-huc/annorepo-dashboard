function toggleVis(id, state, flexType) {

    let flex = 'flex';
    if ( (flexType = '') || (flexType === undefined)) {
        flex = flexType;
    }

    if (state == 'show') {
        document.getElementById(id).classList.remove('hidden');
        document.getElementById(id).classList.add(flex);
    } else {
        document.getElementById(id).classList.remove(flex);
        document.getElementById(id).classList.add('hidden');
    }
    
}



