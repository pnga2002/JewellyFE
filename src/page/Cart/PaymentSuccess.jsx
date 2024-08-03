import React, { useEffect } from 'react';// Assuming you're using Material-UI for styling
import { useSearchParams } from 'react-router-dom';
import { history } from '../../App';
import { Button } from '@mui/material';
import { getStoreJson } from '../../utils/config';
import { useDispatch } from 'react-redux';
import { addOrderApi } from '../../redux/reducer/orderReducer';

const PaymentSuccess = () => {
    const dispatch = useDispatch();

    const [searchParams] = useSearchParams();
    const vpc_AuthorizeId = searchParams.get("vpc_AuthorizeId")
    const vpc_Card = searchParams.get("vpc_Card")
    const vpc_CardExp = searchParams.get("vpc_CardExp")
    const vpc_CardNum = searchParams.get("vpc_CardNum")
    const vpc_CardUid = searchParams.get("vpc_CardUid")
    const vpc_Command = searchParams.get("vpc_Command")
    const vpc_MerchTxnRef = searchParams.get("vpc_MerchTxnRef")
    const vpc_Merchant = searchParams.get("vpc_Merchant")
    const vpc_Message = searchParams.get("vpc_Message")
    const vpc_OrderInfo = searchParams.get("vpc_OrderInfo")
    const vpc_PayChannel = searchParams.get("vpc_PayChannel")
    const vpc_TransactionNo = searchParams.get("vpc_TransactionNo")
    const vpc_TxnResponseCode = searchParams.get("vpc_TxnResponseCode")*1
    const vpc_Version = searchParams.get("vpc_Version")
    const vpc_BinCountry = searchParams.get("vpc_BinCountry")
    const vpc_SecureHash = searchParams.get("vpc_SecureHash")
    const vpc_Amount = searchParams.get("vpc_Amount")
    const renderTrangThai=(vpcMessage) => { 
        switch (vpcMessage) {
          case 0:
            return "Giao dịch thành công";
          case 1:
            return "Ngân hàng từ chối cấp phép giao dịch.";
          case 2:
            return "Ngân hàng phát hành thẻ từ chối cấp phép giao dịch";
          case 3:
          case 6:
          case 7:
            return "Không nhận được kết quả phản hồi từ Tổ chức phát hành thẻ";
          case 4:
            return "Tháng/Năm hết hạn của thẻ không đúng hoặc thẻ đã hết hạn sử dụng";
          case 5:
            return "Số dư/Hạn mức của thẻ không đủ để thanh toán";
          case 8:
            return "Ngân hàng phát hành thẻ không hỗ trợ thanh toán trực tuyến";
          case 9:
            return "Tên chủ thẻ/tài khoản không hợp lệ.";
          case 10:
            return "Thẻ hết hạn/Thẻ bị khóa.";
          case 11:
            return "Thẻ/Tài khoản chưa đăng ký dịch vụ hỗ trợ thanh toán trực tuyến.";
          case 12:
            return "Tháng/Năm phát hành hoặc hết hạn của thẻ không hợp lệ.";
          case 13:
            return "Giao dịch vượt quá hạn mức thanh toán trực tuyến theo quy định của Ngân hàng.";
          case 14:
            return "Số thẻ không hợp lệ.";
          case 21:
            return "Số dư tại tài khoản không đủ để thanh toán.";
          case 22:
            return "Thông tin tài khoản không hợp lệ.";
          case 23:
            return "Thẻ/Tài khoản bị khóa hoặc chưa được kích hoạt.";
          case 24:
            return "Thông tin thẻ/tài khoản không hợp lệ.";
          case 25:
            return "Mã xác thực OTP không hợp lệ.";
          case 26:
            return "Mã xác thực OTP đã hết hiệu lực.";
          case 98:
            return "Xác thực giao dịch bị hủy.";
          case 99:
            return "Người dùng hủy giao dịch.";
          case 'B':
            case 'D':
            return "Lỗi trong quá trình xác thực giao dịch của Ngân hàng phát hành thẻ.";
          case 'F':
            return "Xác thực giao dịch không thành công.";
          case 'U':
            return "Xác thực mã CSC không thành công.";
          case 'Z':
            return "Giao dịch bị từ chối.";
          case 253:
            return "Hết thời hạn nhập thông tin thanh toán.";
          case 'Other':
            return "Lỗi không xác định";
          default:
            return "Lỗi không xác định";
        }
        
       }
    const onReturn=() => { 
        history.push("")
     }
     useEffect(()=>{
        const obj = getStoreJson("order")
        if(vpc_TxnResponseCode==0){
            dispatch(addOrderApi({... obj.order,thanhToan:"Đã thanh toán online"}))
        } else dispatch(addOrderApi({... obj.order,thanhToan:"Chưa thanh toán"}))

     },[vpc_TxnResponseCode])
    return (
        <div style={styles.container}>
             <div>
                {vpc_TxnResponseCode != 0 ?
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                    <linearGradient id="wRKXFJsqHCxLE9yyOYHkza_fYgQxDaH069W_gr1" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f44f5a"></stop><stop offset=".443" stop-color="#ee3d4a"></stop><stop offset="1" stop-color="#e52030"></stop></linearGradient><path fill="url(#wRKXFJsqHCxLE9yyOYHkza_fYgQxDaH069W_gr1)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path d="M33.192,28.95L28.243,24l4.95-4.95c0.781-0.781,0.781-2.047,0-2.828l-1.414-1.414	c-0.781-0.781-2.047-0.781-2.828,0L24,19.757l-4.95-4.95c-0.781-0.781-2.047-0.781-2.828,0l-1.414,1.414	c-0.781,0.781-0.781,2.047,0,2.828l4.95,4.95l-4.95,4.95c-0.781,0.781-0.781,2.047,0,2.828l1.414,1.414	c0.781,0.781,2.047,0.781,2.828,0l4.95-4.95l4.95,4.95c0.781,0.781,2.047,0.781,2.828,0l1.414-1.414	C33.973,30.997,33.973,29.731,33.192,28.95z" opacity=".05"></path><path d="M32.839,29.303L27.536,24l5.303-5.303c0.586-0.586,0.586-1.536,0-2.121l-1.414-1.414	c-0.586-0.586-1.536-0.586-2.121,0L24,20.464l-5.303-5.303c-0.586-0.586-1.536-0.586-2.121,0l-1.414,1.414	c-0.586,0.586-0.586,1.536,0,2.121L20.464,24l-5.303,5.303c-0.586,0.586-0.586,1.536,0,2.121l1.414,1.414	c0.586,0.586,1.536,0.586,2.121,0L24,27.536l5.303,5.303c0.586,0.586,1.536,0.586,2.121,0l1.414-1.414	C33.425,30.839,33.425,29.889,32.839,29.303z" opacity=".07"></path><path fill="#fff" d="M31.071,15.515l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414L18.343,32.485	c-0.391,0.391-1.024,0.391-1.414,0l-1.414-1.414c-0.391-0.391-0.391-1.024,0-1.414l14.142-14.142	C30.047,15.124,30.681,15.124,31.071,15.515z"></path><path fill="#fff" d="M32.485,31.071l-1.414,1.414c-0.391,0.391-1.024,0.391-1.414,0L15.515,18.343	c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0l14.142,14.142	C32.876,30.047,32.876,30.681,32.485,31.071z"></path>
                  </svg>
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                    <linearGradient id="5zzMGVQnN_QyRYWGmJUsQa_A8xKzsTKHhzn_gr1" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#21ad64"></stop><stop offset="1" stop-color="#088242"></stop></linearGradient><path fill="url(#5zzMGVQnN_QyRYWGmJUsQa_A8xKzsTKHhzn_gr1)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path d="M32.172,16.172L22,26.344l-5.172-5.172c-0.781-0.781-2.047-0.781-2.828,0l-1.414,1.414	c-0.781,0.781-0.781,2.047,0,2.828l8,8c0.781,0.781,2.047,0.781,2.828,0l13-13c0.781-0.781,0.781-2.047,0-2.828L35,16.172	C34.219,15.391,32.953,15.391,32.172,16.172z" opacity=".05"></path><path d="M20.939,33.061l-8-8c-0.586-0.586-0.586-1.536,0-2.121l1.414-1.414c0.586-0.586,1.536-0.586,2.121,0	L22,27.051l10.525-10.525c0.586-0.586,1.536-0.586,2.121,0l1.414,1.414c0.586,0.586,0.586,1.536,0,2.121l-13,13	C22.475,33.646,21.525,33.646,20.939,33.061z" opacity=".07"></path><path fill="#fff" d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0	L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414l-13,13	C22.317,33.098,21.683,33.098,21.293,32.707z"></path>
                  </svg>
                }

              </div>
            <h1 style={styles.title}>{vpc_TxnResponseCode==0?"Thanh toán thành công!":"Thanh toán thất bại!"}!</h1>
            {vpc_TxnResponseCode==0 ?<p style={styles.message}>Cám ơn vì đã mua hàng. Thanh toán của bạn đã được xử lý thành công.</p>:
            <p style={styles.message}>Cám ơn vì đã mua hàng. Thanh toán của bạn đã thất bại vui lòng thanh toán khi nhận hàng.</p>}

            <div style={styles.details}>
                <h3>Thông tin thanh toán:</h3>
                <p><strong>Mã giao dịch:</strong> {vpc_TransactionNo}</p>
                <p><strong>Số tiền thanh toán:</strong> {vpc_Amount.toLocaleString()} VND</p>
                <p><strong>Trạng thái:</strong> {renderTrangThai(vpc_TxnResponseCode)}</p>
            </div>

            <Button variant="contained" color="primary" onClick={onReturn} style={styles.button}>
                Return to Home
            </Button>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        background: '#f9f9f9',
        maxWidth: '600px',
        margin: '200px auto',
    },
    title: {
        color: '#4caf50',
        fontSize: '24px',
    },
    message: {
        fontSize: '18px',
        marginBottom: '20px',
    },
    details: {
        textAlign: 'left',
        marginBottom: '20px',
    },
    button: {
        marginTop: '20px',
    }
};

export default PaymentSuccess;
