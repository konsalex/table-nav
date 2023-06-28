import { Meta } from '@storybook/react';
import { useTableNav } from '@table-nav/react';

export default {
  title: 'Svelte/Example',
} as Meta;

export const Test = () => {
  const { listeners } = useTableNav({ debug: true });
  return (
    <table {...listeners}>
      <thead>
        <tr>
          <th colSpan={2} tabIndex={-1}>
            <div>Name </div>
          </th>
          <th colSpan={4} tabIndex={-1}>
            <div>Info </div>
          </th>{' '}
        </tr>
        <tr>
          <th colSpan={1} />
          <th colSpan={1} />
          <th colSpan={1} />
          <th colSpan={3}>
            <div>More Info </div>
          </th>{' '}
        </tr>
        <tr>
          <th colSpan={1}>
            <div className="cursor-pointer select-none">firstName </div>
          </th>
          <th colSpan={1}>
            <div className="cursor-pointer select-none">Last Name </div>
          </th>
          <th colSpan={1}>
            <div className="cursor-pointer select-none">Age </div>
          </th>
          <th colSpan={1}>
            <div className="cursor-pointer select-none">Visits </div>
          </th>
          <th colSpan={1}>
            <div className="cursor-pointer select-none">Status </div>
          </th>
          <th colSpan={1}>
            <div className="cursor-pointer select-none">Profile Progress </div>
          </th>{' '}
        </tr>
      </thead>{' '}
      <tbody>
        <tr>
          <td>Oran</td>
          <td>Hyatt</td>
          <td>0</td>
          <td>796</td>
          <td>relationship</td>
          <td>31</td>{' '}
        </tr>
        <tr>
          <td>Carter</td>
          <td>Watsica</td>
          <td>24</td>
          <td>581</td>
          <td>single</td>
          <td>90</td>{' '}
        </tr>
        <tr>
          <td>Jade</td>
          <td>Windler</td>
          <td>24</td>
          <td>379</td>
          <td>complicated</td>
          <td>65</td>{' '}
        </tr>
        <tr>
          <td>Craig</td>
          <td>Russel</td>
          <td>7</td>
          <td>712</td>
          <td>complicated</td>
          <td>84</td>{' '}
        </tr>
        <tr>
          <td>Alfonzo</td>
          <td>Bogisich</td>
          <td>35</td>
          <td>59</td>
          <td>complicated</td>
          <td>73</td>{' '}
        </tr>
        <tr>
          <td>Tanya</td>
          <td>Barton</td>
          <td>36</td>
          <td>340</td>
          <td>relationship</td>
          <td>31</td>{' '}
        </tr>
        <tr>
          <td>Rhett</td>
          <td>Paucek</td>
          <td>38</td>
          <td>425</td>
          <td>complicated</td>
          <td>99</td>{' '}
        </tr>
        <tr>
          <td>Otilia</td>
          <td>Kuhic</td>
          <td>36</td>
          <td>617</td>
          <td>complicated</td>
          <td>95</td>{' '}
        </tr>
        <tr>
          <td>Maddison</td>
          <td>Tromp</td>
          <td>9</td>
          <td>576</td>
          <td>relationship</td>
          <td>22</td>{' '}
        </tr>
        <tr>
          <td>Cielo</td>
          <td>Kshlerin</td>
          <td>14</td>
          <td>775</td>
          <td>relationship</td>
          <td>86</td>{' '}
        </tr>
      </tbody>{' '}
      <tfoot>
        <tr>
          <th colSpan={1} tabIndex={-1}>
            firstName
          </th>
          <th colSpan={1} tabIndex={-1}>
            lastName
          </th>
          <th colSpan={1} tabIndex={-1}>
            age
          </th>
          <th colSpan={1} tabIndex={-1}>
            visits
          </th>
          <th colSpan={1} tabIndex={-1}>
            status
          </th>
          <th colSpan={1} tabIndex={-1}>
            progress
          </th>{' '}
        </tr>
        <tr>
          <th colSpan={1} />
          <th colSpan={1} />
          <th colSpan={1} />
          <th colSpan={3} />{' '}
        </tr>
        <tr>
          <th colSpan={2}>Name</th>
          <th colSpan={4}>Info</th>{' '}
        </tr>
      </tfoot>
    </table>
  );
};
