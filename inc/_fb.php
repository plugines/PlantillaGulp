<?php if (FB_APP_ID != "") { ?>
<div id="fb-root"></div>

<script>
    // Load the SDK asynchronously
    (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/<?=FB_LANG?>/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
</script>

<script type="text/javascript">

window.fbAsyncInit = function() {
    
    FB.init({
        appId : '<?=FB_APP_ID?>',
        status : true, // check login status
        cookie : true, // enable cookies to allow the server to access the session
        xfbml : true, // parse XFBML
        oauth: true,
        version: 'v2.4'
    });
    
}

</script>
<?php } ?>