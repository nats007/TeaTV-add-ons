

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'http://www.hollymoviehd.com',
    SEARCH: function SEARCH(title) {
        return 'http://www.hollymoviehd.com/?zc=search&s=' + title;
    },
    HEADERS: function HEADERS() {
        return {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Cookie': 'taboola_rw23=5a1a871d45e;',
            'Referer': 'http://www.hollymoviehd.com/checking/',
            'Origin': 'http://www.hollymoviehd.com',
            'Host': 'www.hollymoviehd.com',
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        };
    }
};

var HollyMovies = function () {
    function HollyMovies(props) {
        _classCallCheck(this, HollyMovies);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(HollyMovies, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, detailUrl, urlSearch, htmlSearch, $, itemSearch;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                urlSearch = '';


                                if (type == 'movie') {
                                    urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+')) + ('+' + year);
                                } else {
                                    urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+')) + ('+season+' + season);
                                }

                                if (!httpRequest.cookie) {
                                    _context.next = 8;
                                    break;
                                }

                                _context.next = 8;
                                return httpRequest.cookie.set('http://www.hollymoviehd.com/', 'taboola_rw23', '5a1a871d45e');

                            case 8:
                                _context.prev = 8;
                                _context.next = 11;
                                return httpRequest.get(urlSearch, URL.HEADERS());

                            case 11:
                                htmlSearch = _context.sent;
                                $ = cheerio.load(htmlSearch.data);
                                itemSearch = $('.movies-list .ml-item');


                                itemSearch.each(function () {

                                    var hrefMovie = $(this).find('a').first().attr('href');
                                    var titleMovie = $(this).find('a').first().attr('oldtitle');
                                    var yearMovie = titleMovie.match(/\(([0-9]+)\)/i);
                                    yearMovie = yearMovie != null ? +yearMovie[1] : 0;
                                    var seasonMovie = titleMovie.match(/season *([0-9]+)/i);
                                    seasonMovie = seasonMovie != null ? +seasonMovie[1] : false;
                                    titleMovie = titleMovie.replace(/\([0-9]+\)/i, '').trim();
                                    titleMovie = titleMovie.replace(/ *season *[0-9]+/i, '').trim();

                                    if (stringHelper.shallowCompare(title, titleMovie)) {

                                        if (type == 'movie' && seasonMovie == false && yearMovie == year) {

                                            detailUrl = hrefMovie;
                                            return;
                                        } else if (type == 'tv' && seasonMovie == season) {

                                            detailUrl = hrefMovie;
                                            return;
                                        }
                                    }
                                });
                                _context.next = 20;
                                break;

                            case 17:
                                _context.prev = 17;
                                _context.t0 = _context['catch'](8);

                                console.log(String(_context.t0));

                            case 20:

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 22:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[8, 17]]);
            }));

            function searchDetail() {
                return _ref.apply(this, arguments);
            }

            return searchDetail;
        }()
    }, {
        key: 'getHostFromDetail',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var _libs2, httpRequest, cheerio, base64, _movieInfo2, type, episode, season, hosts, arrRedirect, detailUrl, htmlDetail, $, itemRedirect, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64;
                                _movieInfo2 = this.movieInfo, type = _movieInfo2.type, episode = _movieInfo2.episode, season = _movieInfo2.season;

                                if (this.state.detailUrl) {
                                    _context3.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                hosts = [];
                                arrRedirect = [];
                                detailUrl = this.state.detailUrl;


                                if (type == 'tv') {
                                    detailUrl = detailUrl.replace('/series/', '/episode/');
                                    detailUrl = detailUrl.replace(/-season-[0-9]+\//i, '-season-' + season + '-episode-' + episode + '/');
                                }

                                _context3.next = 10;
                                return httpRequest.getHTML(detailUrl, URL.HEADERS());

                            case 10:
                                htmlDetail = _context3.sent;
                                $ = cheerio.load(htmlDetail);
                                itemRedirect = $('#player2 > div');


                                console.log(itemRedirect.length, '8');
                                itemRedirect.each(function () {

                                    var linkRedirect = $(this).find('iframe').attr('data-lazy-src');

                                    console.log(linkRedirect, '9');
                                    if (linkRedirect != undefined) {

                                        if (linkRedirect.indexOf('http:') == -1 && linkRedirect.indexOf('https:') == -1) {
                                            linkRedirect = 'http:' + linkRedirect;
                                        }

                                        arrRedirect.push(linkRedirect);
                                    }
                                });

                                arrPromise = arrRedirect.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var arrSources, htmlRedirect, sources, _$, embed, item;

                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        arrSources = [];
                                                        htmlRedirect = '';
                                                        _context2.prev = 2;
                                                        _context2.next = 5;
                                                        return httpRequest.getHTML(val, {
                                                            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146 Safari/537.36',
                                                            'Referer': val
                                                        });

                                                    case 5:
                                                        htmlRedirect = _context2.sent;
                                                        _context2.next = 10;
                                                        break;

                                                    case 8:
                                                        _context2.prev = 8;
                                                        _context2.t0 = _context2['catch'](2);

                                                    case 10:
                                                        sources = htmlRedirect.match(/player\.setup\(\{\s*sources\: *\[([^\]]+)/i);

                                                        if (sources == null) {
                                                            _$ = cheerio.load(htmlRedirect);
                                                            embed = _$('iframe').attr('src');


                                                            embed && hosts.push({
                                                                provider: {
                                                                    url: detailUrl,
                                                                    name: "hollymovies"
                                                                },
                                                                result: {
                                                                    file: embed,
                                                                    label: "embed",
                                                                    type: "embed"
                                                                }
                                                            });
                                                        } else {

                                                            sources = sources != null ? sources[1] : '';

                                                            eval('arrSources = [' + sources + ']');

                                                            for (item in arrSources) {

                                                                if (arrSources[item].file.indexOf('google') == -1) {

                                                                    arrSources[item].file && hosts.push({
                                                                        provider: {
                                                                            url: detailUrl,
                                                                            name: "hollymovies"
                                                                        },
                                                                        result: {
                                                                            file: arrSources[item].file,
                                                                            label: "embed",
                                                                            type: "direct"
                                                                        }
                                                                    });
                                                                } else {
                                                                    arrSources[item].file && hosts.push({
                                                                        provider: {
                                                                            url: detailUrl,
                                                                            name: "hollymovies"
                                                                        },
                                                                        result: {
                                                                            file: arrSources[item].file,
                                                                            label: "embed",
                                                                            type: "embed"
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        }

                                                    case 12:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, this, [[2, 8]]);
                                    }));

                                    return function (_x) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 18;
                                return Promise.all(arrPromise);

                            case 18:

                                this.state.hosts = hosts;
                                return _context3.abrupt('return');

                            case 20:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getHostFromDetail() {
                return _ref2.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return HollyMovies;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new HollyMovies({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'HollyMovies',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year
                        };
                        _context4.next = 5;
                        return source.searchDetail();

                    case 5:

                        if (!source.state.detailUrl) {
                            bodyPost.is_link = 0;
                        } else {
                            bodyPost.is_link = 1;
                        }
                        _context4.next = 8;
                        return source.getHostFromDetail();

                    case 8:

                        if (source.state.hosts.length == 0) {
                            bodyPost.is_link = 0;
                        } else {
                            bodyPost.is_link = 1;
                        }

                        _context4.next = 11;
                        return httpRequest.post('https://api.teatv.net/api/v2/mns', {}, bodyPost);

                    case 11:
                        return _context4.abrupt('return', source.state.hosts);

                    case 12:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function (_x2, _x3, _x4) {
        return _ref4.apply(this, arguments);
    };
}();

thisSource.testing = HollyMovies;