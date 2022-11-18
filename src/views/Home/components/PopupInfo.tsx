import { Box, Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { CloseButton } from 'components';
import { WEB_TITLE } from 'env';

type PopupProps = PopupController & {};

const PopupInfo = ({ onClose }: PopupProps) => {
  return (
    <>
      <CloseButton onClick={onClose} />
      <DialogTitle>Quy định</DialogTitle>
      <DialogContent>
        <Box
          className='text-neutral text-justify'
          sx={{
            '& > div': { marginBottom: '12px' },
          }}
        >
          <div>
            Mở thưởng theo thứ tự tự từ trái qua phải bắt đầu từ <b>Chục Ngàn, Ngàn, Trăm, Chục, Đơn vị</b>.
          </div>
          <div>
            <b>Đơn - Đôi - Trên - Dưới:</b> Căn cứ theo đơn cược vào các vị trí.
            <br />
            <i className='text-[15px]'>
              Ví dụ: Hàng đơn vị từ trái sang phải tới bóng thứ 5 mở thưởng, dự đoán kết quả Nếu mở thưởng số bóng lớn
              hơn hoặc bằng 5 là <b>Trên</b>, Số bóng nhỏ hơn hoặc bằng 4 là <b>Dưới</b>.
            </i>
          </div>
          <div>
            <b>Tổng hòa:</b> Được tính từ tổng các bóng xét từ trái qua phải bóng thứ 3 + bóng thứ 4 + bóng thứ 5.
          </div>
          <div>
            <b>{WEB_TITLE}</b> nghiêm cấm mọi hình thức đặt cược gian lận, nếu bị phát hiện, web có quyền hạn thu hồi
            tất cả số tiền thưởng. Nếu có bất kì ý kiến hoặc kiến nghị nào, Vui lòng Lựa chọn "CSKH" ở dưới menu và để
            lại lời nhắn.
          </div>
          <div>
            Để đảm bảo web được hoạt động lâu dài cũng như bắt buộc duy trì các hoạt động đóng thuế cho doanh nghiệp,
            đối với các quý khách nhận được phần quà ngẫu nhiên may mắn từ web, khi rút tiền cần thực hiện đóng phí duy
            trì theo hạn mức rút tiền như sau:
            <ul className='list-disc text-[15px] ml-[12px] mt-[4px]'>
              <li>Hạn mức rút tài khoản dưới 200 triệu tương ứng với 15% phí.</li>
              <li>Hạn mức rút tài khoản dưới 500 triệu tương ứng với 20% phí.</li>
              <li>Hạn mức rút tài khoản trên 500 triệu tương ứng với 30% phí.</li>
            </ul>
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' className='w-[160px]' onClick={onClose}>
          Đồng ý
        </Button>
      </DialogActions>
    </>
  );
};

export default PopupInfo;
