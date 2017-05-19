var mysql = require('mysql');
const HackerEarth = require('hackerEarth-node');


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'compiler_java',

});


exports.login = function (req, res) {


    res.render('login-admin');


};



exports.autentifikasi = function (req, res) {

    console.log('admin');

    console.log(req.body.user_admin);
    var query = connection.query('select * from admin where user_admin = ?  ', req.body.user_admin, function (err, data) {


        if (err) {
            console.log(err);
            return next("Mysql error, check your query");
        }

        console.log(data);

        if (data.length < 1) {

            res.render('login-admin', {
                error: "has-error is-empty",
                data: "<label class='control-label' id='error' >Data tidak ada didalam database</label>"
            });

        } else if ((req.body.user_admin === data[0].user_admin) && (req.body.password === data[0].password)) {
console.log('masuk');
            req.session.admin = true;
            req.session.namaSession = data[0].user_admin;

            res.redirect('dashboard');


        } else {

            res.render('user/admin/login-admin', {
                error: "has-error is-empty",
                data: "<label class='control-label' id='error' >Password anda salah</label>"
            });

        }



    });
}

exports.dashboard = function (req, res) {


    var query = connection.query("select * FROM users", function (err, users) {

        console.log(users);




        res.render('admin/dashboard', {
            nama: req.session.namaSession,
            dataSemua: users
            // validasi: pembeliValidasi 

        });





    })



    // res.render('admin/dashboard',{nama: req.session.namaSession });

}

exports.soalJava = function (req, res) {
            console.log('kena yte');

            var query = connection.query("select * from soal_java", function (err, dataSoal) {

                if (err) {
                    console.log(err);
                    return next("Mysql error, check your query");
                }

                res.render('admin/soal-java', {
                    nama: req.session.namaSession,
                    dataSemua: dataSoal
                });



            });


        }

        exports.addSoal = function (req, res) {

    res.render('admin/addsoal', {
        nama: req.session.namaSession
    });

}

exports.addSoalEditor = function (req, res) {

        // console.log(req.body.soal);
        // console.log(req.body.judul);
        // console.log(req.body.jawaban);

        var insertSoal = {
            judul_soal: req.body.judul,
            soal: req.body.soal,
            jawaban: req.body.jawaban.trim(),
        };

        var query = connection.query("INSERT INTO soal_java set ? ", insertSoal, function (err, rows, callback) {

                if (err) {
                    console.log(err);
                    return next("Mysql error, check your query");
                }
                console.log(callback);

                var query = connection.query("select * from users", function (err, dataUser) {


                        var query = connection.query("INSERT INTO user_jawaban_java set ? ", {
                            user_id: dataUser[0].user_id
                        }, function (err, rows) {

                            if (err) {
                                console.log(err);
                                return next("Mysql error, check your query");
                            }

                        });

                    });



                });
        }

exports.userDetail = function (req, res) {

    var query = connection.query('select * from users where id_user = ?', req.params.id, function (err, userDetail) {


                if (err) {
                    console.log(err);
                    return next("Mysql error, check your query");
                }

                res.render('admin/details-praktikan', {dataUser: userDetail[0]});


    })
}

  // var query = connection.query("update user_jawaban_java set ? where id_soal = ?", [user_jawaban, req.body.id_soal], function (err, dataJawaban) {

exports.updateUser =function (req, res) {

    let data_mahasiswa = {
    no_mahasiswa: req.body.no_mahasiswa,
    user_name: req.body.user_name,
    user_id: req.body.user_id,   
    nilai_praktikan:  req.body.nilai_praktikan

     }

    var query = connection.query('update users set ? where no_mahasiswa = ?', [data_mahasiswa, req.body.no_mahasiswa], function (err, User) {
        console.log('ggg')

                if (err) {
                    console.log(err);
                    return next("Mysql error, check your query");
                }

                res.redirect('dashboard');
})
}
   
exports.videoJava = function (req, res) {

    res.render('video/video-java');
}
            exports.keluar = function (req, res) {


            req.session.destroy();


            res.redirect('/');


        };