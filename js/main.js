{
    'use strict';

    /* アルバム一覧（検索条件エリア） */
    const conditionToggle = document.getElementById('condition-toggle');
    const closedCondition = document.getElementById('closed-condition');
    const opendCondition = document.getElementById('opened-condition');

    conditionToggle.addEventListener('click', () => {
        if (conditionToggle.classList.contains('closed')) {
            conditionToggle.textContent = '[閉じる]';
            conditionToggle.classList.toggle('closed');
            closedCondition.classList.toggle('hide');
            opendCondition.classList.toggle('hide');
        } else {
            conditionToggle.textContent = '[開く]';
            conditionToggle.classList.toggle('closed');
            closedCondition.classList.toggle('hide');
            opendCondition.classList.toggle('hide');
        }
    });

    /* アルバム一覧（検索） */
    const mask = document.getElementById('mask');
    const albumDetail = document.getElementById('album-detail');

    const searchAlbumButton = document.getElementById('search-album');
    const albumList = document.getElementById('album-list');

    searchAlbumButton.addEventListener('click', () => {
        getAlubumList().forEach((album) => {
            const imgAlbum = document.createElement('img');
            const albumName = document.createElement('h1');
            const artistName = document.createElement('div');
            const item = document.createElement('div');

            imgAlbum.classList.add('item-image');
            imgAlbum.src = album.albumArtUrl;
            imgAlbum.addEventListener('click', () => {
                showAlbumDetail(album.albumID);
                mask.classList.remove('hide');
                albumDetail.classList.remove('hide');
            });

            albumName.classList.add('main-sentence');
            albumName.textContent = album.albumName
            albumName.addEventListener('click', () => {
                imgAlbum.click();
            });

            artistName.classList.add('sub-sentence');
            artistName.textContent = album.artistName;

            item.classList.add('item');
            item.appendChild(imgAlbum);
            item.appendChild(albumName);
            item.appendChild(artistName);

            albumList.appendChild(item);
        });
    });

    /* アルバム詳細に情報を設定 */
    function showAlbumDetail(albumID) {
        const album = getAlbumDetail(albumID);

        document.getElementById('label').value = album.label;
        document.getElementById('year').value = album.year;
        document.getElementById('studio').value = album.studio;

        const songsList = createSongsList(album.song);
        const songsArea = document.getElementById('tab-content-songs');
        songsArea.childNodes.forEach((childNode) => {
            songsArea.removeChild(childNode);
        });
        songsArea.appendChild(songsList);

        const artistList = createArtistList(album.artist);
        const artristsArea = document.getElementById('tab-content-personel');
        artristsArea.childNodes.forEach((childNod) => {
            artristsArea.removeChild(childNod);
        });
        artristsArea.appendChild(artistList);
    }

    /**
     * 
     * @param {*} songs 
     * @returns
     */
    function createSongsList(songs) {
        const songsList = document.createElement('ol');
        songs.forEach((song) => {
            const text = document.createElement('input');
            text.setAttribute('type', 'text');
            text.setAttribute('value', song.name);
            text.classList.add('song-name');
            const li = document.createElement('li');
            li.appendChild(text);
            songsList.appendChild(li);
        });
        return songsList;
    }

    function createArtistList(artists) {
        const ul = document.createElement('ul');
        artists.forEach((artist) => {
            const img = document.createElement('img');
            img.src = artist.image;
            img.classList.add('personel-thumbnail');

            const text = document.createElement('input');
            text.type = 'text';
            text.value = artist.name;
            text.classList.add('artist-name');

            const li = document.createElement('li');
            li.appendChild(img);
            li.appendChild(text);

            ul.appendChild(li);
        });
        return ul;
    }

    /* アルバム詳細 */
    const tabMenuSongs = document.getElementById('tab-menu-songs');
    const tabContentSongs = document.getElementById('tab-content-songs');
    const tabMenuPersonel = document.getElementById('tab-menu-personel');
    const tabContentPersonel = document.getElementById('tab-content-personel');

    tabMenuSongs.addEventListener('click', () => {
        tabMenuSongs.classList.add('active');
        tabContentSongs.classList.add('active');
        tabMenuPersonel.classList.remove('active');
        tabContentPersonel.classList.remove('active');
    });

    tabMenuPersonel.addEventListener('click', () => {
        tabMenuSongs.classList.remove('active');
        tabContentSongs.classList.remove('active');
        tabMenuPersonel.classList.add('active');
        tabContentPersonel.classList.add('active');
    });

    const detailClose = document.getElementById('detail-close');
    detailClose.addEventListener('click', () => {
        mask.classList.add('hide');
        albumDetail.classList.add('hide');
    });

    mask.addEventListener('click', () => {
        detailClose.click();
    });

    /* データ取得 */
    function getAlubumList() {
        const albums = [
            {
                "albumID": "1",
                "albumName": "Rainbow Table",
                "albumArtUrl": "img/thumbnail/album/[KouketsuAyumi]RainbowTable.jpg",
                "artistName": "纐纈　歩美",
            },
            {
                "albumID": "2",
                "albumName": "バラーディスト",
                "albumArtUrl": "img/thumbnail/album/[KouketsuAyumi]バラーディスト.jpg",
                "artistName": "纐纈　歩美",
            },
            {
                "albumID": "3",
                "albumName": "O PATO",
                "albumArtUrl": "img/thumbnail/album/[KouketsuAyumi]O_PATO.jpg",
                "artistName": "纐纈　歩美",
            },
        ];
        return albums;
    }

    function getAlbumDetail(albumID) {
        const albums = [
            {
                "albumID": "1",
                "albumName": "Rainbow Table",
                "albumArtUrl": "img/thumbnail/album/[KouketsuAyumi]RainbowTable.jpg",
                "label": "ポニーキャニオン",
                "year": "2012",
                "studio": "RAINBOWスタジオ",
                "song": [
                    {
                        "no": "1",
                        "name" : "ウィズ・メイ",
                    },
                    {
                        "no": "2",
                        "name" : "トゥ・ノット・ワン",
                    },
                    {
                        "no": "3",
                        "name" : "バード・フード",
                    },
                    {
                        "no": "4",
                        "name" : "カユウ",
                    },
                    {
                        "no": "5",
                        "name" : "バークシア・ブルース",
                    },
                    {
                        "no": "6",
                        "name" : "ダイヴァーシティ",
                    },
                    {
                        "no": "7",
                        "name" : "三日月",
                    },
                    {
                        "no": "8",
                        "name" : "ニア・ザ・クラウズ",
                    },
                    {
                        "no": "9",
                        "name" : "ビーウィッチド",
                    },
                    {
                        "no": "10",
                        "name" : "サマータイム",
                    },
                    {
                        "no": "11",
                        "name" : "ホエン・ジョアンナ・ラブド・ミー",
                    },
                ],
                "artist": [
                    {
                        "name": "纐纈歩美",
                        "image": "img/thumbnail/artist/KouketsuAyumi.jpg",
                        "instrument": "alto sax",
                    },
                    {
                        "name": "スヴェイン・オラヴ・ハーシュタ",
                        "image": "img/thumbnail/artist/Svein.jpg",
                        "instrument": "piano",
                    },
                    {
                        "name": "マグネ・トルモッドゥサーテル",
                        "image": "img/thumbnail/artist/noimage.jpg",
                        "instrument": "base",
                    },
                    {
                        "name": "ペロオッドヴァ・ヨハンセン",
                        "image": "img/thumbnail/artist/noimage.jpg",
                        "instrument": "drums",
                    },
                ],
            },
            {
                "albumID": "2",
                "albumName": "Rainbow Table",
                "albumArtUrl": "img/thumbnail/album/[KouketsuAyumi]RainbowTable.jpg",
                "label": "レーベル",
                "year": "録音データ（年代）",
                "studio": "録音データ（スタジオ）",
                "song": [
                    {
                        "no": "",
                        "name" : "",
                    }
                ],
                "artist": [
                    {
                        "name": "",
                        "instrument": "",
                    },
                ],
            },
            {
                "albumID": "3",
                "albumName": "Rainbow Table",
                "albumArtUrl": "img/thumbnail/album/[KouketsuAyumi]RainbowTable.jpg",
                "label": "レーベル",
                "year": "録音データ（年代）",
                "studio": "録音データ（スタジオ）",
                "song": [
                    {
                        "no": "",
                        "name" : "",
                    }
                ],
                "artist": [
                    {
                        "name": "",
                        "instrument": "",
                    },
                ],
            },

        ];


        return albums.find(album => album.albumID == albumID);
    }


}