window.app = {
    initParallax: function() {
        let $window = $(window);
        let winScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        $('[data-type="background"]').each(function () {
            let $bg = $(this);
            let speed = ($bg.data('speed') || 0);
            let posisiY;
            let bgParent = $bg.parent();

            $window.on('scroll resize', function () {
                //  Cek Apakah dalam screen
                let bpTop = bgParent.offset().top - 50;
                let bpHeight = bgParent.outerHeight() + 50;
                if (window.pageYOffset > (bpTop + bpHeight) || (window.pageYOffset + window.innerHeight) < bpTop) {
                    $bg.css({ visibility: 'hidden'});
                    return;
                }
                winScrollTop = window.pageYOffset || document.documentElement.scrollTop;
                posisiY = - ((winScrollTop - $bg.parent()[0].offsetTop) / speed);
                $bg.css({ 
                    visibility: 'visible',
                    transform: 'translateY(' + posisiY + 'px)' 
                });
            });
        });

        $window.trigger('scroll');
    },
    makeCountDown: function (tanggal) {
        //  Inisialisasi
        let cdHari = document.getElementById('cdHari'),
            cdJam = document.getElementById('cdJam'),
            cdMenit = document.getElementById('cdMenit'),
            cdDetik = document.getElementById('cdDetik'),
            mTanggal = moment(tanggal, 'DD-MM-YYYY'),
            mSekarang = moment();
        
        //  Hitung beda
        let mDurasiBeda = mTanggal.diff(mSekarang);
        let mBeda = moment.duration(mDurasiBeda);

        //  Siapkan data
        let dataCountDown = {
            detik: mBeda.seconds(),
            menit: mBeda.minutes(),
            jam: mBeda.hours(),
            hari: mBeda.days(),
        };

        //  Ubah bulan dan tahun ke hari
        if (mBeda.months() > 1)
            dataCountDown.hari += moment,duration(mBeda.months(), 'M').asDays();
        if (mBeda.years() > 1)
            dataCountDown.hari += moment,duration(mBeda.years(), 'y').asDays();
        
        //  Update DOM
        cdHari.innerHTML = dataCountDown.hari;
        cdJam.innerHTML = dataCountDown.jam;
        cdMenit.innerHTML = dataCountDown.menit;
        cdDetik.innerHTML = dataCountDown.detik;

        //  Cek Apakah sudah sampai waktunya
        if (mDurasiBeda > 0) {
            setTimeout(() => {
                this.makeCountDown(tanggal);
            }, 1000);
        } else {
            this.completeCountDown();
        }
    },
    completeCountDown: function () {
        //  Ganti countdown dengan kata kata
    },
    initMap: function () {
        //  Buat Peta
        this.map = new google.maps.Map(document.getElementById('petalokasi'), {
            mapTypeId: google.maps.MapTypeId.HYBRID,
            zoom: 16,
            center: {
                lat: -2.442686720458634, 
                lng: 115.24281005552984
            }
        });

        //  Buat marker
        this.markerAyat = new Marker({
            map: this.map,
            position: { lat: -2.442974, lng: 115.239986 },
            icon: {
                path: MAP_PIN,
                fillColor: '#f86191',
                fillOpacity: 1,
                strokeColor: '',
                strokeWeight: 0
            },
            map_icon_label: '<div class="fa fa-heart mapmarker-icon"><div class="maplabel">Mempelai Pria</div></div>'
        });
        this.markerMawad = new Marker({
            map: this.map,
            position: { lat: -2.444385, lng: 115.244033 },
            icon: {
                path: MAP_PIN,
                fillColor: '#f86191',
                fillOpacity: 1,
                strokeColor: '',
                strokeWeight: 0
            },
            map_icon_label: '<div class="fa fa-heart mapmarker-icon"><div class="maplabel">Mempelai Wanita</div></div>'
        });

        //  Window Informasi
        this.mapInfoContent = {
            ayat: `<div class="petalokasi-info">
                <div class="judul">Mempelai Pria</div>
                <div class="isi">
                    <button type="button" class="btn btn-secondary btn-kecil mb-2" onclick="app.mapResetZoomPan()"><i class="fa fa-undo mr-3"></i>Ke Posisi Awal</button>
                    <button type="button" class="btn btn-secondary btn-kecil mb-2" onclick="app.mapZoomPan(${ this.markerAyat.position.lat() },${ this.markerAyat.position.lng() })"><i class="fa fa-search-plus mr-3"></i>Lihat Lebih Dekat</button>
                    <a href="https://www.google.com/maps?t=h&daddr=${ this.markerAyat.position.lat() },${ this.markerAyat.position.lng() }" target="_blank" class="btn btn-success btn-kecil"><i class="fa fa-map mr-3"></i>Buka di Google Map</a>
                </div>
            </div>`,
            mawad: `<div class="petalokasi-info">
                <div class="judul">Mempelai Wanita</div>
                <div class="isi">
                    <button type="button" class="btn btn-secondary btn-kecil mb-2" onclick="app.mapResetZoomPan()"><i class="fa fa-undo mr-3"></i>Ke Posisi Awal</button>
                    <button type="button" class="btn btn-secondary btn-kecil mb-2" onclick="app.mapZoomPan(${ this.markerMawad.position.lat() },${ this.markerMawad.position.lng() })"><i class="fa fa-search-plus mr-3"></i>Lihat Lebih Dekat</button>
                    <a href="https://www.google.com/maps?t=h&daddr=${ this.markerMawad.position.lat() },${ this.markerMawad.position.lng() }" target="_blank" class="btn btn-success btn-kecil"><i class="fa fa-map mr-3"></i>Buka di Google Map</a>
                </div>
            </div>`,
        };
        this.mapInfo = new google.maps.InfoWindow({
            content: this.mapInfoContent.ayat
        });

        //  Saat diclick
        this.markerAyat.addListener('click', () => {
            this.mapInfo.setContent(this.mapInfoContent.ayat);
            this.mapInfo.open(this.map, this.markerAyat);
        });
        this.markerMawad.addListener('click', () => {
            this.mapInfo.setContent(this.mapInfoContent.mawad);
            this.mapInfo.open(this.map, this.markerMawad);
        });
    },
    mapZoomPan: function (lat, lng) {
        this.map.setZoom(20);
        window.setTimeout(() => this.map.panTo({ lat, lng }), 1);
        this.mapInfo.close();
    },
    mapResetZoomPan: function () {
        this.map.setZoom(16);
        window.setTimeout(() => this.map.panTo({
            lat: -2.442686720458634, 
            lng: 115.24281005552984
        }), 1);
        this.mapInfo.close();
    },
    initGallery: function () {
        $("#galeri-foto").lightGallery({
            selector: '.galeri-item'
        }); 
    },
    init: function () {
        this.initParallax();

        //  Buat hitung mundur
        this.makeCountDown('27-06-2018');

        //  Init Peta
        this.initMap();

        //  Init Gallery
        this.initGallery();
    },
};

//  Init AOS
AOS.init({
    easing: 'ease-out-back',
    delay: 400,
    duration: 600,
    once: true,
    startEvent: 'mulaiAnimasi'
});

//  Init App
$(document).ready(e => app.init());

//  Preloader
$(window).on('load', e => {
    $('.preloader').addClass('hide');
    document.dispatchEvent(new Event('mulaiAnimasi'));
});