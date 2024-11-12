function NodepayNotify(subtitle = '', message = '') {
    $notification.post('Nodepay token', subtitle, message, { 'url': '' });
  };
  
  const abcMartToken = $request.headers['authorization'] || $request.headers['Authorization'];
  const abcMartUA = $request.headers['user-agent'] || $request.headers['user-agent'];
  if (abcMartToken) {
    const saveToken = $persistentStore.write(abcMartToken, 'NodepayToken');
    const saveUA = $persistentStore.write(abcMartUA, 'NodepayUA');
  
    if (!saveToken) {
      NodepayNotify(
        '保存失敗 ‼️',
        '請稍後嘗試'
      );
    } else {
      NodepayNotify(
        '保存成功 🍪',
        ''
      );
    }
  } else {
    NodepayNotify(
      '保存失敗 ‼️',
      '請重新登入'
    );
  }
  $done({});