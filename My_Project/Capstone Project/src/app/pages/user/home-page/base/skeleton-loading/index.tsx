import React, { Fragment } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Col, Row } from 'antd';
import 'react-loading-skeleton/dist/skeleton.css';
import 'app/pages/user/suggestion-page/base/skeleton-loading-room-loadmore//style.scss';

const data = [{}, {}, {}, {}, {}, {}, {}, {}];

export const LoadingRoom: React.FC<any> = () => {
  const loading = data?.map((item: any, key: number) => {
    return (
      <Col xs={24} xl={6} key={key} className="mb-40">
        <div
          className="room__suggestion--item"
          style={{
            display: 'flex',
            paddingLeft: 10,
            width: '100%',
          }}
        >
          <div
            style={{
              width: '100%',
            }}
          >
            {' '}
            <div
              style={{
                // display: 'flex',
                // justifyContent: 'center',
                width: '100%',
              }}
              // className="room__suggestion--item--image"
            >
              <Skeleton width={'100%'} height={220} />
            </div>
            <div>
              <Skeleton
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: 10,
                }}
                count={1}
                width={'100%'}
                height={15}
              />
            </div>
          </div>
        </div>
      </Col>
    );
  });

  return <Fragment>{loading}</Fragment>;
};
