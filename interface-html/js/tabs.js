

function tabs(el, nr) {
    let tabGroup = el.parentNode.getAttribute("data-tabButton");
    let markupDefault = el.parentNode.getAttribute("data-tabMarkupDefault").split(" ");
    let MarkupActive = el.parentNode.getAttribute("data-tabMarkupActive").split(" ");

    //console.log(el.parentNode.children);

    let childs = el.parentNode.children;
    for (let item of childs) {
        //console.log(item.classList.remove(MarkupActive));
        MarkupActive.forEach(classItem => {
            item.classList.remove(classItem);
        });

        markupDefault.forEach(classItem => {
            item.classList.add(classItem);
        });
        

    }
    markupDefault.forEach(classItem => {
        el.classList.remove(classItem);
    });

    MarkupActive.forEach(classItem => {
        el.classList.add(classItem);
    });





    hideTabs(tabGroup);

    const elems = document.querySelectorAll('[data-tabGroup="'+tabGroup+'"]');
    elems[nr].classList.remove('hidden');
    elems[nr].classList.add('flex');

}



function hideTabs(tabGroup) {
    console.log(tabGroup);
    const elems = document.querySelectorAll('[data-tabGroup="'+tabGroup+'"]');
    elems.forEach((item) => {
        item.classList.remove('flex');
        item.classList.add('hidden');
     })
}







function tabs2(buttonId, dataTab) {
    hideTabs(dataTab);
    console.log(buttonId);
    document.getElementById(buttonId).classList.remove('hidden');
    document.getElementById(buttonId).classList.add('flex');
}









function initShowHidden() {
    let hideBlocks = document.querySelectorAll('[data-show-hidden="hide"]');
    //console.log('tabsBlocks', hideBlocks)

    hideBlocks.forEach(elem => {
        //console.log(elem);
        elem.classList.add('hidden');
    });
    
}
initShowHidden()

function showHidden(id) {
    initShowHidden()
    let showElem = document.querySelectorAll('[data-show-hidden-id="'+id+'"]');
    showElem.forEach(elem => {
        elem.classList.remove('hidden');
    });
}
