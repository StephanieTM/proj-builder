module.exports = (options) => {
  return [{
    fileName: 'src/components/homepage/index.tsx',
    content:
`import React, { useState } from 'react';

export default function Homepage(): JSX.Element {
  const [contentSwitch, setContentSwitch] = useState<boolean>(false);

  function handleSwitch() {
    setContentSwitch(!contentSwitch);
  }

  return (
    <div onClick={handleSwitch}>
      {contentSwitch ? (
        <div>Congrats 🎉</div>
      ) : (
        <div>Hello World!</div>
      )}
    </div>
  );
}
`,
  }, {
    fileName: 'src/components/projects/index.tsx',
    content:
`import React from 'react';

export default function Projects(): JSX.Element {
  return (
    <div>
      Projects
    </div>
  );
}
`,
  }];
};
