const mongoose = require('mongoose');
const { Movie, getMovie, editMovie } = require('../src/db/models');
const axios = require('axios');

describe('db models', () => {
  beforeEach(() => {
    mongoose.connect('mongodb://localhost/fMDB')
      .then(() => {
        Movie.create({
          "id": 1000000,
          "title": "donec",
          "cast": [
            {
              "name": "proin leo",
              "character": "varius",
              "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAILSURBVDjLrVM7ixNhFB2LFKJV+v0L24nabIogtmItin9ALBS3tXNt3CWgVlpMsAgrWRexkCSTd0KimYS8Q94vsnlrikAec7z34hSibON+cJjXPeee79xvFADK/0C5UIFyubxLUEulklooFNR8Pn+Sy+VOstmsmslk1HQ6raZSqd2/BCqVyh4RW/V6HePxGJPJRDCdTuU6Go0EZ2dnIFEkk8lWIpHYEwEi24lszGYzjHptfPvsgvbuEJ9ePMPH548Epwf70N4f4fuXY6rpYDgcIh6PG7FYzM62dSav12spfHXn2rk4fbmPxWIhIpFIRFfIzk+v1wvDMLAhka9vD+B88gCv79lxdPeG4M39W/jw9KF8q+oJzOdz2VIoFPqhOJ3O7mAwwHK5xGazketqtRKws3+Bto1arYZgMFhTHA6HC78XW6P0wYJmcAy2y+9arRYoPCHTpOD3+w8Vm8122xTgQhobqtUqms0mGo0GeDLckdOnESIcDqPdbnN3aJp2VbFarTfN7kxmUqfTkSLuyM8syB3pLMj7fr8Pn883kTFaLJbr1EHfbrdilwm9Xg/dblfABNMF3/NWisUiKPjHIkDrMou43e4CF+m6LkUMU4idcFc+WJwRkbU/TiKtS4QrgUDgmGZrcEcelXkKORsWJ9sGkV3n/kzRaHSHgtrQjEGCHJSAyBuPx7Nz4X/jL/ZqKRurPTy6AAAAAElFTkSuQmCC"
            },
            {
              "name": "ligula in",
              "character": "nisi",
              "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHeSURBVDjLjZO/i1NBEMc/u+/lBYxiLkgU7vRstLEUDyxtxV68ykIMWlocaGHrD1DxSAqxNf4t115jo6DYhCRCEsk733s7u2PxkuiRoBkYdmGZz3xndsaoKgDGmC3gLBDxbxsA31U1AKCqzCBXsywbO+e8iOgqz7JM2+32W+AiYFX1GGDHOeen06mmabrwyWSio9FI+/2+ioj2ej3tdDoLiJm+bimAhgBeUe9RmbkrT5wgT97RaDQoioIQAt1ud7/Var1h+uq+/s9+PLilw+FwqSRgJ1YpexHSKenHF4DFf/uC3b7CydsPsafraO5IkoTxeEwIARGh2WwCYNUJAOmHZ5y4eY/a7h4hPcIdHvDz/fMSnjviOCZJEiqVCtVqdfEl8RygHkz9DLZWQzOHisd9OizfckcURRhjMMbMm14CQlEC/NfPjPd2CSJQCEEEDWYBsNZijFkaCqu5Ky+blwl5geaOUDg0c8TnNssSClkER1GEtXYZcOruI6ILl1AJqATirW02Hr8sFThBVZfklyXMFdQbbDzdXzm78z4Bx7KXTcwdgzs3yizuzxAhHvVh4avqBzAzaQa4JiIHgGE9C3EcX7ezhVIgeO9/AWGdYO/9EeDNX+t8frbOdk0FHhj8BvUsfP0TH5dOAAAAAElFTkSuQmCC"
            },
            {
              "name": "amet sem",
              "character": "vestibulum",
              "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHiSURBVDjLjZNfT9NQGMbBb+C9GD+DmH0BvQIXECJKEGUmXpp4TyAQAtdotsTFxAs/AFeEhBsTjHEOZFKmMOBCuNnfzHbrunb9cx7f99SVbtkCTX5p057nd3qe9gwAGGDouEUME5EruEPcCHIhwbBlWZrjOJ7ruugFPUc8Hn8bloQFEQ43Gg0YhhFQq9WgqipKpZKUFAoFJBKJQNIOD7KAB5imiVarJc+MruvQNA3lclkKms0meJJkMulLugUcbsMCDigVA0u5Fl4foWNJspNuAS0jGMDXimrjVVZg5gB4fiDkm+Tz+f6CbhZPBaZ/AisnLo4rDdlHtVrtFExmzNv3P31Z2yh52Cx7MB0/rGgepjPA033g47mLYt3vpF6vXwqmfuFu7DeKL7PA3CEwqwCq5QtWzwQm9oCxNBD9DnwuOrITJhDMZLHDwcmUnlv/I/D+Qvifq+niyQ8/vJwTWCVONVuWy//DpUDB32dUUOTd1nx73RXTxcKxwMMU8EYRskzbtiUc7hCMZfBhitb4KO1ZMSrrBfF4Fxj5RvfotQ9VNwiHCQQPdnFzNI3taMqzxikQpVlHKRzbF/ha8eTsvej3GUW/fdADLxD8l9yjggx+cJ0wjdXl7g0Jhlhyje3chrf+0D9WXtarnqRU7gAAAABJRU5ErkJggg=="
            },
            {
              "name": "sed vel",
              "character": "ridiculus",
              "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHtSURBVDjLjZM9T9tQFIYpQ5eOMBKlW6eWIQipa8RfQKQghEAKqZgKFQgmFn5AWyVDCipVQZC2EqBWlEqdO2RCpAssQBRsx1+1ndix8wFvfW6wcUhQsfTI0j33PD7n+N4uAF2E+/S5RFwG/8Njl24/LyCIOI6j1+v1y0ajgU64cSSTybdBSVAwSMmmacKyLB/DMKBpGkRRZBJBEJBKpXyJl/yABLTBtm1Uq1X2JsrlMnRdhyRJTFCpVEAfSafTTUlQoFs1luxBAkoolUqQZbmtJTYTT/AoHInOfpcwtVtkwcSBgrkDGYph+60oisIq4Xm+VfB0+U/P0Lvj3NwPGfHPTcHMvoyFXwpe7UmQtAqTUCU0D1VVbwTPVk5jY19Fe3ZfQny7CE51WJDXqpjeEUHr45ki9rIqa4dmQiJfMLItGEs/FcQ2ucbRmdnSYy5vYWyLx/w3EaMfLmBaDpMQvuDJ65PY8Dpnz3wpYmLtApzcrIAqmfrEgdZH1grY/a36w6Xz0DKD8ES25/niYS6+wWE8mWfByY8cXmYEJFYLkHUHtVqNQcltAvoLD3v7o/FUHsNvzlnwxfsCEukC/ho3yUHaBN5Buo17Ojtyl+DqrnvQgUtfcC0ZcAdkUeA+ye7eMru9AUGIJPe4zh509UP/AAfNypi8oj/mAAAAAElFTkSuQmCC"
            },
            {
              "name": "eu orci",
              "character": "dictumst",
              "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGKSURBVCjPPVFNSwJRFH1SPyR00V+xIqJVREIEUm6VFm1ahFvLiiI/oE1QRlQgUtgHlKhp41dlokVFpKmjo41M69MZlbi8d+Gec8897z4BoYcwREdj67fJsHqunkp728cjvToR/UoYs66I9og6OvjEA0o41FzeXWOfkB+6CZQIqajhGz/MRWQRh+dg3USCMNyvvbG3xVDQ5JFRJkXFNZZ8JNyZw1qbfTrUZuhwk1mihktbGRNxd45QqxvtroqMBip4pZcYHB4Rkhr44oh2H9bzJ/srHBLEYkoE1RZF5X8PLZ4qnmm3SqsOlQSpC1X6KhU+ssacwxlvW0ccSWnObOCdkK7ygUcSmijQ5BNsKeH1FMnOkK2wWOCtII9LDlCxBeuWCJh3tTynKVRJItG1meUOyqTMaTMT3KTTdwUNUYa+i3uCMvcSgR+2VTFAwo5xcz/EV6dps06VKLu/EMDUyeRw/7NcRoffqcXp+4I2X+DB9K/VbTH9/6Yey6MLfrtkV62d2cz8hmVcDPbqfy6NlFRFHkA7AAAAAElFTkSuQmCC"
            },
            {
              "name": "et commodo",
              "character": "leo",
              "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAF5SURBVDjLpZMxa5RBEIafvdu7RPCMhYLBxCoiaqO/IHZWNvkBooh1WrHUwk4s0sTGQrsQwf9gK1gpQoJoY++d5Ludd2YtvlwuaWLODAyzsPu88zLMplorp4n85t3W5vLS4sPc6/VqgMKxIiRRJEoRxYzx2NpajFKMvaaxH993X+flpcXHl169SAv3P/Gge42Nm2//2TUlOH/ubO/p85eXc879dHF1lfmrXe50bgNwfeXKsQJfd37S7XZw95TNxa+7a8Aa94BxKXz+sgOA5JgJuWNyJEfe1m+7gUvkGsGtGyv/NcDt9x8uZCkA2GvGM8Fn5ueIGmR3B2Cu3z/yoNbaJpWI9uwR1NreAXgEuZhmAicJEO5kk2YGD5qFTx1EjRODk4gIsu0LuMeJwSMCxexgIIfhduPSsQI1gjwajYZN0wx+D/8QEfsC00kfdjMxVKn0cwcPV1p/8mx9MFh4BJ1BcU23T0JmyA1JuBlyx2WEO2Y2jPCP6bTf+S96U2WlbWXHPgAAAABJRU5ErkJggg=="
            },
            {
              "name": "nulla tellus",
              "character": "consequat",
              "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG7SURBVDjLjZMxi1NREIXPC9HCKGGN2MgWdio2utZxA0KKVPkBwqaR/IS0dqYx/0LIVpsuBMFKA5LdQotF1kJWcMvYmBfemzPH4r4X3+pDMjDM3MvMx5m53Gg4HJ5L2pV0OhgMHmAL6/f779I03Sd5WgGw2+l0QPIetrQ4jvd7vR7iOL5fJXkymUweXb1+OzparCQATiCPDsAFkMDz5rUIANbr9dvRaPTMzN5HkgAAR4uVdmoVQKFJHhqlEC9+Og6eBkDRqnlCD8V5Q+4S4A6Yl4+zAeSFyiS7/wVhOWEzwuGHlW7eqEACPp0vgyoJJCA6zAE3hxlgJF4d3I0uKTABLIxwZ+dKUOECXXCGSApff6QlO2BBNpWdBXcHHSAdZAAkqZcABFwsHXQPxS44HSSyuz9K0lT/AopP9PJwKZpvJNMdbgp7oMOsBFA0M8EKkjc7yHIz/h+QJoRZddNoVLZMhxOXFXS73UWSJHskj6fT6RMASM1x9v0XUgdoDiNgRjjD03588wK3Xn+RmZ2h3W5rNpup2WxKErbxRqOh8XisWq2mqNVqHSdJ8pjkyXw+39vmN9br9c9m9pDkt98JJaJgEg+kbwAAAABJRU5ErkJggg=="
            },
            {
              "name": "vestibulum velit",
              "character": "porttitor",
              "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFxSURBVDjLpZO/S1ZRGMc/5/aqIFhYKCKBOGTttYT1JziJsw26uQit/gHOOgQR7tHi0tjmWIGDPyIoGgQd1BCqe+8532/Dfd/7evEtFR84nOE853O+z/c5T7DNTaIF8GL98zIwATwDHoONCchkWSALIAklTvta/vrw/u0nyLycfRSwzfzap9e+Zqy+3bHtSgHwHODN1nEt7X+FLUzfZe/HaV6XgDzWOXwwOgBACL0v7x/mAPz+U/bXANuDnVe/HOVXMs8phS5AbnWkXTWUxHlAAFh6v4iUkM2rmQ2+HfzseXly/A5WAiCrABWtKApGxu5R5GWdPDTY31h1CbEBqDwviwhAnheNF8tkytTsixS7gFArKNug8nITY3HOg3bXY4ztPTWS+25d7KkduwBFGQgpJrY/7mGrTjz7VfRWoGqIWgBJ+g5MvlvYvOD2P0uwT7o/MWlzbuXDlO2nSMNSBAsrYUVwwhLV5NqgM8h2AcJNx/kvz3X5EBChVawAAAAASUVORK5CYII="
            }
          ],
          "photos": [
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIvSURBVDjLpZNPiBJRHMffG6aZHcd1RNaYSspxSbFkWTpIh+iwVEpsFC1EYO2hQ9BlDx067L1b0KVDRQUa3jzWEughiDDDZRXbDtauU5QV205R6jo6at+3lNShKdgHH77zm9/f994MHQwGZCuLI1tctgVKpZJQLBYluxj6ty3M3V+alfvNG1Efzy03XGT9e3vu+rkD9/5rAiTPiGI/2RvZNrrSkmWL52ReGNw9f+3hzD8LIHmC9M2M4pHI2upbEqD18tdPnwmzOWJlpi/fmrAtcMrfnld5k+gvdeKTrcXT07FJxVovMHuMtsiUv3/xjzOoVCo3Lcs6DEi32xVAIBKJ0MzCY3My6BN1XSeqqpKnperGiamDUi6Xa3U6nTemaRLoGodEy+v1hlEsjBdXBEGg+Xz+2fgORazVamclSSLVavXMnjGHlM1m78iy7Gi321dDoVAYRQK0UCiMU0pfN5vNXShggH2gDud21gloeNahO6EfoSr4Iopi3TCMBS4aja40Go1vmOA9Ao7DsYgORx0ORxkadzqdS9AYdBn+uKIoTI9omsa28GTzO3iEBeMCHGyCIPQDdDd0lU0AaswG7L0X52QAHbs/uXkL6HD7twnKrIPL5Sqyjm63m00U93g8JdjHoC9QJIYCdfB8+CWmUqkuHKMI8rPThQahr8BeUEWwBt4BFZ33g0vJZPIQ/+s+kcCDDQSTn1c0BElD2HXj0Emv13tg+y/YrUQiITBNp9OdH302kDq15BFkAAAAAElFTkSuQmCC",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHYSURBVDjLlVLPS1RxHJynpVu7KEn0Vt+2l6IO5qGCIsIwCPwD6hTUaSk6REoUHeoQ0qVAMrp0COpY0SUIPVRgSl7ScCUTst6zIoqg0y7lvpnPt8MWKuuu29w+hxnmx8dzzmE5+l7mxk1u/a3Dd/ejDjSsII/m3vjJ9MF0yt93ZuTkdD0CnnMO/WOnmsxsJp3yd2zfvA3mHOa+zuHTjy/zojrvHX1YqunAZE9MlpUcZAaZQBNIZUg9XdPBP5wePuEO7eyGQXg29QL3jz3y1oqwbvkhCuYEOQMp/HeJohCbICMUVwr0DvZcOnK9u7GmQNmBQLJCgORxkneqRmAs0BFmDi0bW9E72PPda/BikwWi0OEHkNR14MrewsTAZF+lAAWZEH6LUCwUkUlntrS1tiG5IYlEc6LcjYjSYuncngtdhakbM5dXlhgTNEMYLqB9q49MKgsPjTBXntVgkDNIgmI1VY2Q7QzgJ9rx++ci3ofziBYiiELQEUAyhB/D29M3Zy+uIkDIhGYvgeKvIkbHxz6Tevzq6ut+ANh9fldetMn80OzZVVdgLFjBQ0tpEz68jcB4ifx3pQeictVXIEETnBPCKMLEwBIZAPJD767V/ETGwsjzYYiC6vzEP9asLo3SGuQvAAAAAElFTkSuQmCC"
          ],
          "storyline": "potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur",
          "plotKeyWords": [
            "cubilia",
            "pharetra",
            "libero"
          ],
          "taglines": "iaculis justo in hac habitasse platea dictumst",
          "country": "pede",
          "releaseDate": "11/04/2017",
          "aka": "nunc donec quis orci",
          "languages": [
            "consectetuer",
            "volutpat",
            "dolor",
            "nibh",
            "aliquam"
          ],
          "filmingLocations": [
            "interdum",
            "rhoncus",
            "morbi"
          ],
          "genres": [
            "ipsum",
            "rhoncus sed",
            "curae nulla"
          ],
          "officialSites": [
            "aliquam",
            "id",
            "mi"
          ],
          "budget": "$18469188.34",
          "openingWeekend": "$8911385.78",
          "gross": "$63138648.73",
          "cumulative": "$462937353.35",
          "productionCo": [
            "vulputate",
            "id luctus"
          ],
          "runtime": 155,
          "trivia": "eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl",
          "goofs": "in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque",
          "quotes": "nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec",
          "crazyCredits": "consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis",
          "connections": "lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim",
          "soundtracks": [
            "rhoncus dui",
            "vestibulum"
          ],
          "faq": [
            "justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas",
            "luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum",
            "viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et",
            "vel enim sit amet nunc viverra dapibus nulla suscipit ligula in"
          ]
        })
          .then(() => console.log('Movie 1000000 created'))
      });
  });
  afterAll(() => {
    // delete movie 100000
    Movie.deleteOne({ id: '1000000'})
      .then(() =>  mongoose.disconnect());
  });

  test('Creates and retrieves a movie with a given id', (done) => {
    // dummy data
    expect.assertions(2);
    getMovie(1000000)
      .then(result => {
        expect(result.id).toEqual(1000000)
        expect(result).toBeTruthy();
        done();
      })
  });

  test('Edits a movie with a given id (edit movie title property)', (done) => {
    expect.assertions(1);
    const newMovieTitle = 'New Title';

    editMovie(1000000, 'title', newMovieTitle)
      .then(result => {
        expect(result.title).toBe(newMovieTitle);
        done();
      })
  });
})