  function NodepayNotify(subtitle = '', message = '') {
    $notification.post('Nodepay 定時簽到', subtitle, message, {
      'url': ''
    });
  };
  
  const checkinRequest = {
    url: 'https://api.nodepay.ai/api/mission/complete-mission',
    headers: {
      'authorization': $persistentStore.read('NodepayToken'),
      'User-Agent': $persistentStore.read('NodepayUA'),
      'content-type': 'application/json'

    },
    body:"{\"mission_id\": \"19\"}"
  };
  
  function checkin() {
    $httpClient.post(checkinRequest, function (error, response, data) {
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
              if (obj.code === 0) {
                NodepayNotify(
                  '領取成功' + obj.msg,
                  '獲得 ' + obj.data.earned_points + ' 積分'
                );
              }else if (obj.code === 400) {
                NodepayNotify(
                  '領取失敗' + obj.msg,
                  '尚無法領取，請等待下一輪檢查'
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