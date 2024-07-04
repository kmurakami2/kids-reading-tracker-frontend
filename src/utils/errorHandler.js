export const handleApiError = (error) => {
    if (error.response) {
      return error.response.data.message || 'サーバーエラーが発生しました。';
    } else if (error.request) {
      return 'サーバーに接続できません。ネットワーク接続を確認してください。';
    } else {
      return 'リクエストの送信中にエラーが発生しました。';
    }
  };