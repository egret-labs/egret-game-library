/** Created with JetBrains WebStorm.
 * User: yjtx
 * Date: 14-8-25
 * Time: 下午12:33
 * Class: google.d.ts
 * Summary:
 */
declare module google {
    module ima {
        class AdDisplayContainer {
            constructor(div);
        }
        class AdsLoader {
            constructor(adDisplayContainer);
            requestAds(adsRequest);
        }
        class AdsManagerLoadedEvent {

        }

        module AdEvent {
            class Type {
                static CONTENT_PAUSE_REQUESTED;
                static CONTENT_RESUME_REQUESTED;
                static ALL_ADS_COMPLETED;
                static LOADED;
                static STARTED;
                static COMPLETE;
            }
        }

        module AdErrorEvent {
            class Type {
                static AD_ERROR;
            }
        }

        module AdsManagerLoadedEvent {
            class Type {
                static ADS_MANAGER_LOADED;
            }
        }

        class ViewMode {
            static NORMAL;
        }

        class AdsRequest {
            public adTagUrl;
            public linearAdSlotWidth;
            public linearAdSlotHeight;
            public nonLinearAdSlotWidth;
            public nonLinearAdSlotHeight;
        }

    }
}