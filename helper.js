class Helper {

    hide(element, classSelector) {
        element.classList.remove(classSelector);
    };

    show(element, classSelector) {
        element.classList.add(classSelector);
    };
}

export default Helper;