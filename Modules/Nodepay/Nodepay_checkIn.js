  function NodepayNotify(subtitle = '', message = '') {
    $notification.post('Nodepay 簽到', subtitle, message, {
      'url': ''
    });
  };
  
  const checkinRequest = {
    url: 'https://api.nodepay.ai/api/mission/complete-mission',
    headers: {
      'authorization': $persistentStore.read('NodepayToken'),
      'User-Agent': $persistentStore.read('NodepayUA'),

    }
  };
  
  function checkin() {
    $httpClient.get(checkinRequest, function (error, response, data) {
      if (error) {
        NodepayNotify(
          '簽到失敗 ‼️',
          '連線錯誤'
        );
        $done();
      } else {
        if (response.status === 200) {
            const obj = JSON.parse(data);
            try {
              if (obj.status === 1) {
                NodepayNotify(
                  '目前點數',
                  '獲得 ' + obj.result.data.earned_points + ' 積分'
                );
              } else {
                NodepayNotify(
                  '檢查點數紀錄失敗 ‼️️',
                  'Error: ' + obj.message
                );
              }
            } catch (e) {
              NodepayNotify(
                '簽到失敗 ‼️',
                e
              );
            }
        } else {
          NodepayNotify(
            'Cookie 已過期 ‼️',
            '請重新登入'
          );
          $done();
        }
      }
      $done();
    });
  }
  checkin();