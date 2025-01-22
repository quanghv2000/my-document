import React, { Fragment, useEffect, useState } from 'react';
import { AutoComplete } from 'antd';
import 'app/components/search-bar-mobile/style.scss';
import { Select } from 'antd';
import { Link } from 'app/components/link';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { vietnameseStringToUnicode } from 'helper/search-vietnamese-words';
import MapIcon from 'assets/google-maps.png';
import { useHistory } from 'react-router-dom';
import LogoUyTin from 'assets/protection.png';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types';
import { getDataTypeOfRentalRequest } from 'app/pages/admin/admin-type-of-rental-management-page/screen/action';
import { getHouseSuggestionRequest } from 'app/pages/user/suggestion-page/screen/action';

export const SearchBarMobile: React.FC<any> = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [roomData, setRoomData]: any = useState([]);
  const [typeOfRental, setTypeOfRental]: any = useState(null);
  const [houseName, setHouseName]: any = useState('');
  const { Option } = Select;
  const state = useSelector((state: RootState) => state?.searchPageReducer);

  useEffect(() => {
    dispatch(getDataTypeOfRentalRequest(''));
  }, [dispatch]);

  const stateAdmin = useSelector(
    (state: RootState) => state?.adminTypeOfRentalPageReducer
  );

  const addAutocompleteHouse = () => {
    let newArray: any = [];
    state?.dataSuggestion?.map((item: any) => {
      newArray.push({
        value: (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              {item?.name}{' '}
              <span style={{ color: 'gray', fontSize: 12 }}>
                - {item?.typeOfrental}
              </span>
            </div>
            <div>
              {item?.verify === 'VERIFIED' ? (
                <img
                  src={LogoUyTin}
                  alt="uy-tin.png"
                  style={{ height: 18, marginRight: 2, marginBottom: 4 }}
                />
              ) : (
                ''
              )}
            </div>
          </div>
        ),
        name: item?.name + ' ' + item?.typeOfrental,
        keyword: item?.name,
      });
    });
    setRoomData(newArray);
  };

  useEffect(() => {
    if (state?.dataSuggestion?.length > 0) {
      addAutocompleteHouse();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.dataSuggestion]);

  useEffect(() => {
    dispatch(getHouseSuggestionRequest(''));
  }, []);

  return (
    <Fragment>
      <div className="search-box__mobile">
        <div className="search-box__area__mobile">
          <Select
            defaultValue={'Tất cả'}
            style={{ width: '100%', fontSize: 13 }}
            size="large"
            onChange={(value: any, items: any) => {
              if (items?.key === 'all') {
                setTypeOfRental(null);
                addAutocompleteHouse();
              } else {
                let newArray: any = [];
                setTypeOfRental(value);
                state?.dataSuggestion?.map((item: any) => {
                  if (items?.children === item?.typeOfrental) {
                    newArray.push({
                      value: (
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div>
                            {item?.name}{' '}
                            <span style={{ color: 'gray', fontSize: 12 }}>
                              - {item?.typeOfrental}
                            </span>
                          </div>
                          <div>
                            {item?.verify === 'VERIFIED' ? (
                              <img
                                src={LogoUyTin}
                                alt="uy-tin.png"
                                style={{
                                  height: 18,
                                  marginRight: 2,
                                  marginBottom: 4,
                                }}
                              />
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                      ),
                      name: item?.name + ' ' + item?.typeOfrental,
                      keyword: item?.name,
                    });
                  }
                });
                setRoomData(newArray);
              }
            }}
          >
            <Option key={'all'} value={null}>
              Tất cả
            </Option>
            {stateAdmin?.dataResponse?.length > 0
              ? stateAdmin?.dataResponse?.map((item: any, key: any) => {
                  return (
                    <Option key={key} value={item?.id}>
                      {item?.name}
                    </Option>
                  );
                })
              : ''}
          </Select>
        </div>
        <AutoComplete
          style={{
            width: '100%',
          }}
          options={roomData ? roomData : []}
          onChange={(data: string) => {
            setHouseName(data);
          }}
          onSelect={(data: string, value: any) => {
            if (data) {
              history.push(`/suggesstion?houseName=${value?.keyword}`);
            }
          }}
          placeholder={
            <span className="search-box__placeholder">
              <i className="fa-solid fa-magnifying-glass mr-5"> </i>
              {/* {t(translations.navbarFeature.search_placeholder)} */}
              Tìm kiếm ...
            </span>
          }
          filterOption={(input: any, option: any) =>
            vietnameseStringToUnicode(option?.name?.toLowerCase()).indexOf(
              vietnameseStringToUnicode(input.toLowerCase())
            ) >= 0
          }
          size="large"
          className="search-box-form__search"
        />

        <div className="search-box-bottom">
          <div
            className="search-box__map"
            onClick={() => history.push('/suggesstion?type=map')}
          >
            <img src={MapIcon} className="map__icon" alt="map-icon" />
            <div className="search-box__map__title">
              {/* {t(translations.navbarFeature.map)} */}
              map
            </div>
          </div>
          <div className="search-box__button__container">
            <button
              className="search-box__button--mobile"
              onClick={() => {
                if (houseName) {
                  history.push(`/suggesstion?houseName=${houseName}`);
                } else {
                  history.push(`/suggesstion?typeRental=${typeOfRental}`);
                }
              }}
            >
              <i className="fa-solid fa-magnifying-glass"> </i>
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
