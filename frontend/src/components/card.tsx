import { DeleteOutlined, EditOutlined, QuestionCircleOutlined, SelectOutlined } from '@ant-design/icons';
import { Avatar, Card, message, Popconfirm, Tooltip } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const confirm = (e: React.MouseEvent<HTMLElement>) => {
  console.log(e);
  message.success('Click on Yes');
};

const cancel = (e: React.MouseEvent<HTMLElement>) => {
  console.log(e);
  message.error('Click on No');
};

function CardItem() {
  return (
    <Card
      style={{ width: 300, margin: 'auto' }}
      // cover={
      //   <img
      //     alt="example"
      //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      //   />
      // }
      actions={[
        <Tooltip placement="bottom" color={'blue'} title="Acessar link">
          <Link to="#">
            <SelectOutlined key="select" style={{ color: 'blue' }} />
          </Link>
        </Tooltip>,

        <Tooltip placement="bottom" title="Atualizar link">
          <Link to="apps/edit">
            <EditOutlined key="edit" />
          </Link>
        </Tooltip>,

        <Tooltip placement="bottom" color={'red'} title="Deletar link">
          <Popconfirm
            title="Deletar link"
            description="Tem certeza que deseja deletar esse link?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Sim"
            cancelText="Não"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          >
            <DeleteOutlined key="delete" style={{ color: 'red' }} />
          </Popconfirm>
        </Tooltip>
      ]}
    >
      <Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title="Card title"
        description="This is the description"
      />
    </Card>
  )
}

export default CardItem;
