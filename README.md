## React Azure Maps Playground

This project is community-driven initiative originally created by amazing [@psrednicki](https://github.com/psrednicki), [@msasinowski](https://github.com/msasinowski) and [@tbajda](https://github.com/tbajda) and is now maintained by the Azure Maps team.

- How to link local package version:
  - run `yarn watch` in `azure-maps-react`
  - run `yarn link` in `azure-maps-react`
  - go to `azure-maps-playground` and run `yarn link "react-azure-maps"`

- How to avoid "Invalid Hook call" caused by multiple React instances
  - go to `azure-maps-playground` and run
    ```
    cd node_modules/react
    yarn link
    ```
  - go to `azure-maps-react` and run `yarn link react`

### Subscription key

Please remember to create file and add key to `/src/key.ts`

`export const key = '<Your Subcription Key>'`

## Creators ✨

<!-- CREATORS:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td style="text-align: center; vertical-align: middle;">
      <a href="https://github.com/psrednicki"
        ><img
          src="https://avatars2.githubusercontent.com/u/41010528?v=4"
          width="100px;"
          alt=""
        /><br /><sub><b>psrednicki</b></sub></a
      ><br />
    <div>
      <a
        href="https://pl.linkedin.com/in/patryk-%C5%9Brednicki-718204187/"
        title="LinkedIn"
        style="text-align:center"
        ><img
          src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
          width="24px;"
          alt=""
      /></a>
    </div>
    </td>
    <td style="text-align: center; vertical-align: middle;">
      <a href="https://github.com/msasinowski"
        ><img
          src="https://avatars2.githubusercontent.com/u/38035075?v=4"
          width="100px;"
          alt=""
        /><br /><sub><b>msasinowski</b></sub></a
      >
    <div>
      <a
        href="https://www.linkedin.com/in/maciej-sasinowski-92076815a/"
        title="LinkedIn"
        style="text-align:center"
        ><img
          src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
          width="24px;"
          alt=""
      /></a>
    </div>
    </td>
    <td style="text-align: center; vertical-align: middle;">
      <a href="https://github.com/tbajda"
        ><img
          src="https://avatars2.githubusercontent.com/u/27700326?v=4"
          width="100px;"
          alt=""
        /><br /><sub><b>tbajda</b></sub></a
      >
    <div>
      <a
        href="https://www.linkedin.com/in/tomasz-bajda-ab4468165/"
        title="LinkedIn"
        ><img
          src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
          width="24px;"
          alt=""
      /></a>
    </div>
    </td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- CREATORS:END -->
