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
                LoadPanelFor(PartialPageNames.Portfolio);
                break;
            case "About Us":
                LoadPanelFor(PartialPageNames.About);
                break;
            case "Contact Us":
                LoadPanelFor(PartialPageNames.ContactForm);
                break;
        }
    } else {
        $(buttonClicked).removeClass('active');        
        $('.home').addClass('active');
        PanelShrink();
    }
};

const PanelGrow = () => {
    Panel.animate({'top':'0%'});
};

const PanelShrink = () => {
    Panel.animate({'top':'-100%'});
};

const LoadPanelFor = (PartilPageName) => {
    $.ajax({
        url: PartilPageName,
        success: (result) => {
            PanelShrink();
            $('#ContentPlate').empty();``
            $('#ContentPlate').append(result);
            PanelGrow();
        },
        error: (result) => {
            console.log(result);
        }
    });
};