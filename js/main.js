const Panel = $('#ContentPlate');

const PanelSlideUp = (buttonClicked) => {
    let navItems = $('.nav-item');
    if(!$(buttonClicked).hasClass('active')){
        for (let i = 0; i < navItems.length; i++){
            $(navItems[i]).removeClass('active');
        }
        $(buttonClicked).addClass('active');
        switch ($($(buttonClicked).children()[1]).html()) {
            case "Home":
                PanelShrink();
                break;
            case "Portfolio":
                PanelGrow(GetPortfolio);
                break;
            case "About Us":
                PanelGrow();
                break;
            case "Contact Us":
                PanelGrow(GetContactForm);
                break;
        }
    } else {
        $(buttonClicked).removeClass('active');        
        $('.home').addClass('active');
        PanelShrink();
    }
};

const PanelGrow = (expandAction) => {
    if(Panel.height() > 0){
        PanelShrink();
    }
    Panel.animate({'min-height':'100vh'});
    if(expandAction instanceof Function){
        expandAction();
    }
};

const PanelShrink = () => {
    if(Panel.height() > 50){
        Panel.animate({'min-height':'0vh'});
        $('#ContentPlate').empty();
    }
};

const GetPortfolio = () => {
    $.ajax({
        url: './partialViews/Portfolio.html',
        success: (result) => {
            $('#ContentPlate').append(result);
        },
        error: (result) => {
            console.log(result);
        }
    });
};

const GetContactForm = () => {
    $.ajax({
        url: './partialViews/ContactUs.html',
        success: (result) => {
            $('#ContentPlate').append(result);
        },
        error: (result) => {
            console.log(result);
        }
    });
};