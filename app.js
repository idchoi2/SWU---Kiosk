'use strict';

// Declare app level module which depends on views, and components
angular.module('swuKioskApp', [

]).
run(['$rootScope', function($rootScope) {

}])
.controller('MainCtrl', ['$scope', '$sce', '$timeout', function($scope, $sce, $timeout) {

        $scope.isOpen = false;
        $scope.isPrevDisable = false;
        $scope.isNextDisable = false;
        $scope.videoWidth = 1280;
        $scope.loading = false;

        /**
        * 영상 보기
        * @param qsn
        * @constructor
        */
        $scope.OpenVideo = function(qsn) {

            // 정보 가져오기
            $scope.titNo = qsn.titNo;
            $scope.videoNo = qsn.videoList[0].vodNo;
            $scope.person = qsn.videoList[0].psnNo;
            $scope.cate = qsn.videoList[0].cate;
            $scope.keyword = qsn.videoList[0].keyword;
            $scope.videoList = qsn.videoList;
            $scope.videoSrc = $sce.trustAsResourceUrl("video/"+$scope.videoNo+".mp4");

            $scope.CheckPrev(qsn.videoList, 0);
            $scope.CheckNext(qsn.videoList, 0);
            $scope.isOpen = true;
            $scope.loading = true;

            $timeout(function() {

                var video = document.getElementById("video");
                video.currentTime = 0;

                $scope.duration = video.duration;

                $timeout(function() {
                    video.play();
                    $scope.loading = false;
                }, 100);

            }, 2000);
        };

        /**
         * 영상 닫기
         * @constructor
         */
        $scope.CloseVideo = function() {
            $scope.isOpen = false;
            var video = document.getElementById("video");
            video.currentTime = 0;
            video.pause();
        };

        /**
         * 이전 비디오 확인
         * @param list
         * @param index
         * @constructor
         */
        $scope.CheckPrev = function(list, index) {
            if(!list[index - 1]) {
                $scope.isPrevDisable = true;
            } else {
                $scope.isPrevDisable = false;
                $scope.prevVideo = list[index - 1];
                $scope.prevVideo.idx = index - 1;
            }
        };

        /**
         * 다음 비디오 확인
         * @param list
         * @param index
         * @constructor
         */
        $scope.CheckNext = function(list, index) {
            if(!list[index + 1]) {
                $scope.isNextDisable = true;
            } else {
                $scope.isNextDisable = false;
                $scope.nextVideo = list[index + 1];
                $scope.nextVideo.idx = index + 1;
            }
        };

        /**
         * 이전 비디오 재생
         * @constructor
         */
        $scope.PrevVideo = function() {
            $scope.ChangeVideo($scope.prevVideo, $scope.videoList, $scope.prevVideo.idx);
        };

        /**
         * 다음 비디오 재생
         * @constructor
         */
        $scope.NextVideo = function() {
            $scope.ChangeVideo($scope.nextVideo, $scope.videoList, $scope.nextVideo.idx);
        };

        /**
         * 영상 변경
         * @param vod
         * @constructor
         */
        $scope.ChangeVideo = function(vod, videoList, index) {

            if(!$scope.loading && ($scope.videoNo != vod.vodNo)) {
                var video = document.getElementById("video");
                video.pause();
                $scope.loading = true;

                $scope.CheckPrev(videoList, index);
                $scope.CheckNext(videoList, index);

                $scope.videoNo = vod.vodNo;
                $scope.person = vod.psnNo;
                $scope.cate = vod.cate;
                $scope.keyword = vod.keyword;
                $scope.videoSrc = $sce.trustAsResourceUrl("video/" + $scope.videoNo + ".mp4");

                $timeout(function () {
                    video.currentTime = 0;
                    $scope.duration = video.duration;
                    $timeout(function () {
                        video.play();
                        $scope.loading = false;
                    }, 100);
                }, 2000);
            }
        };

        /**
         * 특정 지점 영상 보기
         * @param event
         * @constructor
         */
        $scope.SeekVideo = function(event) {
            var video = document.getElementById("video");
            video.currentTime = $scope.duration * (event.offsetX / $scope.videoWidth);
        };

        /**
         * 질문 목록
         * @type {{titNo: string, title: string, posX: number, posY: number, videoList: {vodNo: string, psnNo: string, psnExt: string, cate: string, keyword: string}[]}[]}
         */
        $scope.qsnList = [
            {
                titNo: '101',
                title: "생활관 교육은 어떤 것이었나요?",
                posX: 656,
                posY: 261,
                videoList: [
                    {
                        vodNo: '001',
                        psnNo: '001',
                        psnExt: '',
                        cate: "3년간의 생활관 생활",
                        keyword: "생활관, 앞선교육, 불만, 자율점수, 변소"
                    },
                    {
                        vodNo: '002',
                        psnNo: '004',
                        psnExt: '-1',
                        cate: "3년간의 생활관 생활",
                        keyword: "더불어 살기"
                    },
                    {
                        vodNo: '003',
                        psnNo: '004',
                        psnExt: '-2',
                        cate: "3년간의 생활관 생활",
                        keyword: "단체생활 규율, 배려"
                    },
                    {
                        vodNo: '004',
                        psnNo: '005',
                        psnExt: '-1',
                        cate: "3년간의 생활관 생활",
                        keyword: "생활관, 규범"
                    },
                    {
                        vodNo: '005',
                        psnNo: '005',
                        psnExt: '-2',
                        cate: "3년간의 생활관 생활",
                        keyword: "관칙, 공동체(책임, 규범)"
                    },
                    {
                        vodNo: '006',
                        psnNo: '006',
                        psnExt: '',
                        cate: "3년간의 생활관 생활",
                        keyword: "생활관 24시, 농가주택"
                    },
                    {
                        vodNo: '007',
                        psnNo: '003',
                        psnExt: '',
                        cate: "생활관 교육",
                        keyword: "습관, 매너, 훈련, 실천, 환경, 소등"
                    },
                    {
                        vodNo: '008',
                        psnNo: '010',
                        psnExt: '',
                        cate: "3년간의 생활관 생활",
                        keyword: "학부 생활, 생활관, 넓은 세상, 다양한 방법"
                    },
                    {
                        vodNo: '009',
                        psnNo: '008',
                        psnExt: '',
                        cate: "생활관 교육",
                        keyword: "생활관, 이브닝, 단체, 습관, 공동생활, 예절, 슬리퍼"
                    }
                ]
            },
            {
                titNo: '102',
                title: "생활교육의 특징이 무엇인가요?",
                posX: 707,
                posY: 323,
                videoList: [
                    {
                        vodNo: '010',
                        psnNo: '007',
                        psnExt: '-1',
                        cate: "생활교육의 영향",
                        keyword: "유대, 원초적인 경험 공유"
                    },
                    {
                        vodNo: '011',
                        psnNo: '007',
                        psnExt: '-2',
                        cate: "생활교육의 좋은점",
                        keyword: "바보 드러내기, 친구"
                    }
                ]
            },
            {
                titNo: '103',
                title: "생활관은 무엇이고 어떻게 건립되었나요?",
                posX: 637,
                posY: 393,
                videoList: [
                    {
                        vodNo: '012',
                        psnNo: '009',
                        psnExt: '',
                        cate: "24시간 생활교육이 이뤄질 생활관",
                        keyword: "생활관 건립, 보딩스쿨, 생활관 중요성"
                    }
                ]
            },
            {
                titNo: '104',
                title: "1961년 개교당시 생활관 환경이 어땠나요?",
                posX: 614,
                posY: 457,
                videoList: [
                    {
                        vodNo: '013',
                        psnNo: '009',
                        psnExt: '-1',
                        cate: "개교초기 생활관",
                        keyword: "생활관 식사, 어려움, 가정방문"
                    },
                    {
                        vodNo: '014',
                        psnNo: '009',
                        psnExt: '-2',
                        cate: "개교초기 생활관",
                        keyword: "침대, 매트리스"
                    },
                    {
                        vodNo: '015',
                        psnNo: '009',
                        psnExt: '-3',
                        cate: "개교초기 생활관",
                        keyword: "생활관 식사 준비, 지인들 도움"
                    }
                ]
            },
            {
                titNo: '105',
                title: "1961년 개교당시 생활관에서 학생들의 생활은 어땠나요?",
                posX: 667,
                posY: 521,
                videoList: [
                    {
                        vodNo: '016',
                        psnNo: '004',
                        psnExt: '',
                        cate: "3년간의 생활관 생활",
                        keyword: "자가발전, 옹달샘"
                    },
                    {
                        vodNo: '017',
                        psnNo: '009',
                        psnExt: '',
                        cate: "개교초기 생활관에서 학생들의 생활",
                        keyword: "며느리감, 생활관 에피소드, 단체생활"
                    }
                ]
            },
            {
                titNo: '106',
                title: "생활관에서의 일과는 어땠나요?",
                posX: 208,
                posY: 568,
                videoList: [
                    {
                        vodNo: '018',
                        psnNo: '009',
                        psnExt: '',
                        cate: "생활관 종소리",
                        keyword: "종, 소등, 취침"
                    }
                ]
            },
            {
                titNo: '107',
                title: "생활관에서 생활하면서 기억에 남는 일은 무엇인가요?",
                posX: 107,
                posY: 635,
                videoList: [
                    {
                        vodNo: '019',
                        psnNo: '007',
                        psnExt: '-1',
                        cate: "생활관, 자치회",
                        keyword: "방변경, 생활관, 자치회장"
                    },
                    {
                        vodNo: '020',
                        psnNo: '007',
                        psnExt: '-2',
                        cate: "생활관 추억",
                        keyword: "생활관, 소등, 수다"
                    },
                    {
                        vodNo: '021',
                        psnNo: '004',
                        psnExt: '',
                        cate: "3년간의 생활관 생활",
                        keyword: "학교 에피소드(시험, 담요, 못깨는)"
                    },
                    {
                        vodNo: '022',
                        psnNo: '005',
                        psnExt: '-1',
                        cate: "3년간의 생활관 생활",
                        keyword: "생활관, 설거지, 김장"
                    },
                    {
                        vodNo: '023',
                        psnNo: '005',
                        psnExt: '-2',
                        cate: "3년간의 생활관 생활",
                        keyword: "아그네스킴, 딸기밭, 잼, 요깡, 생활관 같이 살았다"
                    },
                    {
                        vodNo: '024',
                        psnNo: '005',
                        psnExt: '-3',
                        cate: "3년간의 생활관 생활",
                        keyword: "식당, 고기, 부엌, 주전자 밤, 지하수"
                    },
                    {
                        vodNo: '025',
                        psnNo: '006',
                        psnExt: '',
                        cate: "3년간의 생활관 생활",
                        keyword: "미쓰자율, 밤새 수다떨기, 자율규정"
                    },
                    {
                        vodNo: '026',
                        psnNo: '003',
                        psnExt: '',
                        cate: "생활관 기억",
                        keyword: "자율부장, 황금박쥐, 소등 위반, 공동체"
                    },
                    {
                        vodNo: '027',
                        psnNo: '002',
                        psnExt: '',
                        cate: "생활관",
                        keyword: "생활관 에피소드, 선배, 설거지"
                    },
                    {
                        vodNo: '028',
                        psnNo: '008',
                        psnExt: '',
                        cate: "생활관 에피소드",
                        keyword: "생활관, 사회학, 사회사업학, 라면, 담요"
                    }
                ]
            },
            {
                titNo: '108',
                title: "자율점수가 무엇인가요?",
                posX: 359,
                posY: 699,
                videoList: [
                    {
                        vodNo: '029',
                        psnNo: '002',
                        psnExt: '',
                        cate: "자율점수",
                        keyword: "1회, 자율점수, 자율규정, 생활관"
                    }
                ]
            },
            {
                titNo: '109',
                title: "당시 자율아씨로 뽑혀서 어땠나요?",
                posX: 237,
                posY: 761,
                videoList: [
                    {
                        vodNo: '030',
                        psnNo: '008',
                        psnExt: '',
                        cate: "자율아씨",
                        keyword: "자율아씨, 자율 점수"
                    }
                ]
            },
            {
                titNo: '110',
                title: "생활교육 내용이 학창시절과 비교해서 무엇이 가장 달라졌나요?",
                posX: 109,
                posY: 830,
                videoList: [
                    {
                        vodNo: '031',
                        psnNo: '007',
                        psnExt: '-1',
                        cate: "생활관 관장을 지내면서",
                        keyword: "생활관 관장, 시대 변화, 기간 단축"
                    },
                    {
                        vodNo: '032',
                        psnNo: '007',
                        psnExt: '-2',
                        cate: "생활관 관장을 지내면서",
                        keyword: "학생 스스로 규칙 정하기, 원칙, 배려"
                    },
                    {
                        vodNo: '033',
                        psnNo: '007',
                        psnExt: '-3',
                        cate: "생활관 관장을 지내면서",
                        keyword: "안전, 흡연, 소통"
                    }
                ]
            },
            {
                titNo: '111',
                title: "생활교육의 영향, 결과는 무엇이라고 생각하시나요?",
                posX: 173,
                posY: 895,
                videoList: [
                    {
                        vodNo: '034',
                        psnNo: '005',
                        psnExt: '',
                        cate: "인성교육의 중요성",
                        keyword: "인성교육의 중요성"
                    },
                    {
                        vodNo: '035',
                        psnNo: '006',
                        psnExt: '',
                        cate: "생활교육의 영향",
                        keyword: "인간관계"
                    },
                    {
                        vodNo: '036',
                        psnNo: '003',
                        psnExt: '',
                        cate: "실습주택",
                        keyword: "공동체,  진실된 인간, 황금박쥐 친구"
                    },
                    {
                        vodNo: '037',
                        psnNo: '010',
                        psnExt: '',
                        cate: "3년간의 생활관 생활",
                        keyword: "공동체, 생활, 전인교육, 정리, 사회나가서"
                    }
                ]
            },
            {
                titNo: '201',
                title: "자전거, 유도 등을 필수로 배웠다고 하는데 기억에 남는 일은 있었나요?",
                posX: 2023,
                posY: 239,
                videoList: [
                    {
                        vodNo: '038',
                        psnNo: '004',
                        psnExt: '-1',
                        cate: "시청에서 청량리까지",
                        keyword: "자전거, 시청-청량리, 농과필수"
                    },
                    {
                        vodNo: '039',
                        psnNo: '004',
                        psnExt: '-2',
                        cate: "시청에서 청량리까지",
                        keyword: "자전거, 시청-청량리, 농과필수, 농촌지도자"
                    },
                    {
                        vodNo: '040',
                        psnNo: '004',
                        psnExt: '-3',
                        cate: "시청에서 청량리까지",
                        keyword: "자전거, 시청-청량리, 농과필수, 대통령 자전거 장려"
                    },
                    {
                        vodNo: '041',
                        psnNo: '006',
                        psnExt: '',
                        cate: "체육 전한병 선생님",
                        keyword: "호신술,질문"
                    }
                ]
            },
            {
                titNo: '301',
                title: "실습주택은 교육은 어떤 것이었나요?",
                posX: 1598,
                posY: 745,
                videoList: [
                    {
                        vodNo: '042',
                        psnNo: '004',
                        psnExt: '-1',
                        cate: "4학년때 1년간 살았던 실습주택",
                        keyword: "직장과 가정"
                    },
                    {
                        vodNo: '043',
                        psnNo: '004',
                        psnExt: '-2',
                        cate: "4학년때 1년간 살았던 실습주택",
                        keyword: "고박사님 경험"
                    },
                    {
                        vodNo: '044',
                        psnNo: '005',
                        psnExt: '-1',
                        cate: "실습주택",
                        keyword: "3명"
                    },
                    {
                        vodNo: '045',
                        psnNo: '005',
                        psnExt: '-2',
                        cate: "4학년때 1년간 살았던 실습주택",
                        keyword: "실습주택"
                    },
                    {
                        vodNo: '046',
                        psnNo: '005',
                        psnExt: '-3',
                        cate: "4학년때 1년간 살았던 실습주택",
                        keyword: "실습주택, 조직생활, 핵심"
                    },
                    {
                        vodNo: '047',
                        psnNo: '005',
                        psnExt: '-4',
                        cate: "4학년때 1년간 살았던 실습주택",
                        keyword: "실습주택의중요성 계획 부터"
                    },
                    {
                        vodNo: '048',
                        psnNo: '005',
                        psnExt: '-5',
                        cate: "4학년때 1년간 살았던 실습주택",
                        keyword: "공동체(실습주택)"
                    }
                ]
            },
            {
                titNo: '302',
                title: "개교초기 실습주택에서 학생들의 생활은 어땠나요?",
                posX: 1601,
                posY: 818,
                videoList: [
                    {
                        vodNo: '049',
                        psnNo: '009',
                        psnExt: '',
                        cate: "개교초기 실습주택",
                        keyword: "실습주택 에피소드, 연탄 보일러"
                    }
                ]
            },
            {
                titNo: '303',
                title: "실습주택에서 생활하면서 기억에 남는 추억이 있나요?",
                posX: 1546,
                posY: 877,
                videoList: [
                    {
                        vodNo: '050',
                        psnNo: '001',
                        psnExt: '-1',
                        cate: "4학년때 1년간 살았던 실습주택",
                        keyword: "김장, 자율점수 올리기, 극성언니"
                    },
                    {
                        vodNo: '051',
                        psnNo: '001',
                        psnExt: '-2',
                        cate: "실습주택",
                        keyword: "구멍탄, 눈총, 밥통, 식사당번, 시큼한 미역국"
                    },
                    {
                        vodNo: '052',
                        psnNo: '001',
                        psnExt: '-3',
                        cate: "4학년때 1년간 살았던 실습주택",
                        keyword: "남자친구 초대 잔치"
                    },
                    {
                        vodNo: '053',
                        psnNo: '006',
                        psnExt: '-1',
                        cate: "4학년때 1년간 살았던 실습주택",
                        keyword: "9명, 조짜기, 10호, 초대 책읽고, 독후감, 영화 엘리자베스 테일러. 작은아씨들, 강사초대 런치, 등산, 다양한 프로그램"
                    },
                    {
                        vodNo: '054',
                        psnNo: '006',
                        psnExt: '-2',
                        cate: "4학년때 1년간 살았던 실습주택",
                        keyword: "실습주택"
                    },
                    {
                        vodNo: '055',
                        psnNo: '002',
                        psnExt: '-1',
                        cate: "4학년때 1년간 살았던 실습주택",
                        keyword: "학장님 초청잔치, 기도제목"
                    },
                    {
                        vodNo: '056',
                        psnNo: '002',
                        psnExt: '-2',
                        cate: "4학년때 1년간 살았던 실습주택",
                        keyword: "실습주택 에피소드, 냉잇국, 호스트, 호스티스"
                    },
                    {
                        vodNo: '057',
                        psnNo: '008',
                        psnExt: '-1',
                        cate: "실습주택 에피소드",
                        keyword: "귀가 시간, 점호"
                    },
                    {
                        vodNo: '058',
                        psnNo: '008',
                        psnExt: '-2',
                        cate: "4학년때 1년간 살았던 실습주택",
                        keyword: "식사준비, 어머니 초대잔치, 준비, 세팅"
                    }
                ]
            },
            {
                titNo: '401',
                title: "농촌생활실습을 하면서 기억에 남는 일은 무엇인가요?",
                posX: 1846,
                posY: 563,
                videoList: [
                    {
                        vodNo: '059',
                        psnNo: '005',
                        psnExt: '',
                        cate: "1960년대 농촌생활실습",
                        keyword: "농촌생활실습(충원)"
                    },
                    {
                        vodNo: '060',
                        psnNo: '006',
                        psnExt: '-1',
                        cate: "1960년대 농촌생활실습",
                        keyword: "3, 4 학년 2주, 열흘 농촌실습, 경기도 마석, 충청도"
                    },
                    {
                        vodNo: '061',
                        psnNo: '006',
                        psnExt: '-2',
                        cate: "1960년대 농촌생활실습",
                        keyword: "농촌생활실습, 시대상"
                    },
                    {
                        vodNo: '062',
                        psnNo: '010',
                        psnExt: '',
                        cate: "1970년 농촌생활실습",
                        keyword: "농촌실습, 농촌실습노트, 농촌 이해"
                    }

                ]
            },
            {
                titNo: '402',
                title: "농촌생활실습 가서 무슨 활동을 했나요?",
                posX: 1878,
                posY: 638,
                videoList: [
                    {
                        vodNo: '063',
                        psnNo: '004',
                        psnExt: '-1',
                        cate: "1960년대 농촌생활실습",
                        keyword: "농촌실습, 노래"
                    },
                    {
                        vodNo: '064',
                        psnNo: '004',
                        psnExt: '-2',
                        cate: "1960년대 농촌생활실습",
                        keyword: "농촌실습, 감자, 옥수수, 순박한 농촌"
                    }
                ]
            },
            {
                titNo: '501',
                title: "1964년에 학생들이 직접 지었다는 농촌개량주택이 무엇인가요?",
                posX: 2372,
                posY: 860,
                videoList: [
                    {
                        vodNo: '065',
                        psnNo: '004',
                        psnExt: '',
                        cate: "우리 손으로 벽돌집을 짓다",
                        keyword: "농촌개량주택"
                    }
                ]
            },
            {
                titNo: '601',
                title: "개교 초기에 특별교육이나 행사는 어떤 것이 있었나요?",
                posX: 2851,
                posY: 390,
                videoList: [
                    {
                        vodNo: '066',
                        psnNo: '004',
                        psnExt: '',
                        cate: "화요특강중 기억나는 이야기",
                        keyword: "특별교육, 화요특강, 콩나물"
                    },
                    {
                        vodNo: '067',
                        psnNo: '005',
                        psnExt: '',
                        cate: "쌍쌍파티",
                        keyword: "쌍쌍파티, 사교춤"
                    }
                ]
            },
            {
                titNo: '602',
                title: "개교초기에는 남학생 출입이 엄격히 제한되었었는데, 기억에 남는 일은 있나요?",
                posX: 2697,
                posY: 463,
                videoList: [
                    {
                        vodNo: '068',
                        psnNo: '004',
                        psnExt: '',
                        cate: "3년간의 생활관 생활",
                        keyword: "서울대공대 빨래"
                    },
                    {
                        vodNo: '069',
                        psnNo: '005',
                        psnExt: '',
                        cate: "빨래도둑",
                        keyword: "조교시절(공대, 빨래일)"
                    }
                ]
            },
            {
                titNo: '603',
                title: "학교에서 생활하면서 남자친구는 어떻게 만나셨나요?",
                posX: 2887,
                posY: 533,
                videoList: [
                    {
                        vodNo: '070',
                        psnNo: '005',
                        psnExt: '',
                        cate: "4학년때 1년간 살았던 실습주택",
                        keyword: "실습주택(남자 초대)"
                    }
                ]
            },
            {
                titNo: '701',
                title: "학교에서 돼지와 소를 키웠었나요?",
                posX: 3180,
                posY: 913,
                videoList: [
                    {
                        vodNo: '071',
                        psnNo: '004',
                        psnExt: '-1',
                        cate: "학교농장에서 생긴 일",
                        keyword: "돈사 에피소드"
                    },
                    {
                        vodNo: '072',
                        psnNo: '004',
                        psnExt: '-2',
                        cate: "학교농장에서 생긴 일",
                        keyword: "소키우기 에피소드"
                    }
                ]
            },
            {
                titNo: '801',
                title: "지도자 교육은 어떤 내용으로 이뤄졌었나요?",
                posX: 1470,
                posY: 364,
                videoList: [
                    {
                        vodNo: '073',
                        psnNo: '002',
                        psnExt: '-1',
                        cate: "생활관",
                        keyword: "이브닝 프로그램, 단체, 성격 변화, 특수 훈련"
                    },
                    {
                        vodNo: '074',
                        psnNo: '002',
                        psnExt: '-2',
                        cate: "G.S.",
                        keyword: "G.S. 지도자 훈련, 단체 생활"
                    }
                ]
            },
            {
                titNo: '802',
                title: "지도자교육 내용 중 기억에 남는 수업은 무엇인가요?",
                posX: 1529,
                posY: 429,
                videoList: [
                    {
                        vodNo: '075',
                        psnNo: '005',
                        psnExt: '-1',
                        cate: "4H",
                        keyword: "이브닝 프로그램, 단체, 성격 변화, 특수 훈련"
                    },
                    {
                        vodNo: '076',
                        psnNo: '005',
                        psnExt: '-2',
                        cate: "생활교육 내용중 4H 교육",
                        keyword: "4h 앤더슨관"
                    }
                ]
            }
        ];





}])
.directive('someVideo', function ($window) {
    return{
        scope: {
            videoCurrentTime: "=videoCurrentTime"
        },
        controller: function ($scope, $element) {

            $scope.onTimeUpdate = function () {
                $scope.videoCurrentTime = $element[0].currentTime;
                $scope.$apply();
            }
        },
        link: function (scope, elm) {
            scope.$watch('videoCurrentTime', function (newVar) {
                elm[0].currentTime = newVar;

            });
            elm.bind('timeupdate', scope.onTimeUpdate);
        }
    }

})
.filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}]);