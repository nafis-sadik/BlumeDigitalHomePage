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
                setTimeout(() => { $('#ContentPlate').empty(); }, 400);
                PanelShrink();
                break;
            case "Portfolio":
                console.log($('#ContentPlate').position().top);
                setTimeout(() => { $('#ContentPlate').empty(); }, 400);
                PanelShrink();
                $.get(PartialPageNames.Portfolio, (result) => {
                    setTimeout(() => { $('#ContentPlate').append(result); }, 400);
                });
                PanelGrow();
                break;
            case "About Us":
                console.log($('#ContentPlate').position().top);
                setTimeout(() => { $('#ContentPlate').empty(); }, 400);
                PanelShrink();
                $.get(PartialPageNames.About, (result) => {
                    setTimeout(() => { $('#ContentPlate').append(result); }, 400);                    
                });
                PanelGrow();
                break;
            case "Contact Us":
                $('#ContentPlate').position();
                setTimeout(() => { $('#ContentPlate').empty(); }, 400);
                PanelShrink();
                $.get(PartialPageNames.ContactForm, (result) => {
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

const PanelShrink = () => {
    Panel.animate({'top':'-100%'}, 600);
};

const PanelGrow = () => {
    Panel.animate({'top':'0%'}, 600);
};

const LoadPanelFor = (PartilPageName) => {
    return $.ajax({ url: PartilPageName });
};