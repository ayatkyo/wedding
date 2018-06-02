var app = {
    initParallax: function() {
        let $window = $(window);
        let winScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        $('[data-type="background"]').each(function () {
            let $bg = $(this);
            let speed = ($bg.data('speed') || 0);
            let posisiY;

            $window.on('scroll resize', function () {
                winScrollTop = window.pageYOffset || document.documentElement.scrollTop;
                posisiY = - (winScrollTop / speed);
                $bg.css({ transform: 'translateY(' + posisiY + 'px)' });
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
    init: function () {
        this.initParallax();

        //  Buat hitung mundur
        this.makeCountDown('27-06-2018');
    },
};

//  Init App
app.init();