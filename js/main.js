const Panel = $('#ContentPlate');
const PartialPageNames= {
    Home: '#',
    Portfolio: './partialViews/Portfolio.html',
    About: './partialViews/AboutUs.html',
    ContactForm: './partialViews/ContactUs.html'
};

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
                PanelShrink();
                $.get(PartialPageNames.Portfolio, (result) => {
                    $('#ContentPlate').empty();
                    setTimeout(() => { $('#ContentPlate').append(result); }, 400);                    
                });
                PanelGrow();
                break;
            case "About Us":
                PanelShrink();
                $.get(PartialPageNames.About, (result) => {
                    $('#ContentPlate').empty();
                    setTimeout(() => { $('#ContentPlate').append(result); }, 400);                    
                });
                PanelGrow();
                break;
            case "Contact Us":
                PanelShrink();
                $.get(PartialPageNames.ContactForm, (result) => {
                    $('#ContentPlate').empty();
                    setTimeout(() => { $('#ContentPlate').append(result); }, 400);                    
                });
                PanelGrow();
                break;
        }
    } else {
        $(buttonClicked).removeClass('active');        
        $('.home').addClass('active');
        PanelShrink();
    }
};

const PanelGrow = () => {
    Panel.animate({'top':'0%'}, 600);
};

const PanelShrink = () => {
    Panel.animate({'top':'-100%'}, 600);
};

const LoadPanelFor = (PartilPageName) => {
    return $.ajax({ url: PartilPageName });
};